from flask import Flask, request, jsonify, send_file
import youtube_dl
import threading
import os

app = Flask(__name__)
download_progress = {}

# Funktion zum Downloaden
def download_video(url, video_id):
    global download_progress
    options = {
        'outtmpl': f'videos/{video_id}.%(ext)s',
        'progress_hooks': [lambda d: update_progress(d, video_id)],
    }
    with youtube_dl.YoutubeDL(options) as ydl:
        info = ydl.extract_info(url, download=True)
        return {
            'title': info.get('title'),
            'description': info.get('description'),
            'thumbnail': info.get('thumbnail'),
            'filepath': ydl.prepare_filename(info)
        }

def update_progress(d, video_id):
    if d['status'] == 'downloading':
        download_progress[video_id] = d['_percent_str']
    elif d['status'] == 'finished':
        download_progress[video_id] = '100%'

@app.route('/download', methods=['POST'])
def download():
    data = request.json
    url = data['url']
    video_id = str(hash(url))
    thread = threading.Thread(target=download_video, args=(url, video_id))
    thread.start()
    return jsonify({'video_id': video_id})

@app.route('/progress/<video_id>', methods=['GET'])
def progress(video_id):
    return jsonify({'progress': download_progress.get(video_id, '0%')})

@app.route('/videos/<video_id>', methods=['GET'])
def get_video(video_id):
    filepath = f'videos/{video_id}.mp4'
    if os.path.exists(filepath):
        return send_file(filepath)
    return jsonify({'error': 'File not found'}), 404

if __name__ == '__main__':
    os.makedirs('videos', exist_ok=True)
    app.run(debug=True)

