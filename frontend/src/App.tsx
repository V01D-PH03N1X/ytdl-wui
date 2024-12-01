import React, { useState } from "react";
import DownloadForm from "./components/DownloadForm";
import VideoTable from "./components/VideoTable";

interface Video {
    url: string;
    video_id: string;
    progress: string;
}

const App: React.FC = () => {
    const [videos, setVideos] = useState<Video[]>([]);

    const addVideo = (video: Video) => {
        setVideos((prev) => [...prev, video]);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-bold mb-4">YouTube Video Downloader</h1>
            <DownloadForm onAddVideo={addVideo} />
            <VideoTable videos={videos} />
        </div>
    );
};

export default App;
