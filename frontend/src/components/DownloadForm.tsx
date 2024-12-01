import React, { useState } from "react";
import axios from "axios";

interface DownloadFormProps {
    onAddVideo: (video: { url: string; video_id: string; progress: string }) => void;
}

const DownloadForm: React.FC<DownloadFormProps> = ({ onAddVideo }) => {
    const [url, setUrl] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { data } = await axios.post<{ video_id: string }>("/download", { url });
        onAddVideo({ url, video_id: data.video_id, progress: "0%" });
        setUrl(""); // Reset the input field
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter YouTube URL"
                className="p-2 rounded-l bg-gray-800 border-none focus:outline-none text-white w-3/4"
            />
            <button type="submit" className="p-2 bg-red-600 rounded-r">
                Download
            </button>
        </form>
    );
};

export default DownloadForm;
