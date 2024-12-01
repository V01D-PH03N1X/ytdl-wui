import React, { useEffect, useState } from "react";
import axios from "axios";

interface VideoTableProps {
    videos: { url: string; video_id: string; progress: string }[];
}

const VideoTable: React.FC<VideoTableProps> = ({ videos }) => {
    const [progressMap, setProgressMap] = useState<Record<string, string>>({});

    useEffect(() => {
        const interval = setInterval(async () => {
            for (const { video_id } of videos) {
                const { data } = await axios.get<{ progress: string }>(`/progress/${video_id}`);
                setProgressMap((prev) => ({ ...prev, [video_id]: data.progress }));
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [videos]);

    return (
        <table className="table-auto w-full bg-gray-800">
            <thead>
            <tr>
                <th className="px-4 py-2">URL</th>
                <th className="px-4 py-2">Progress</th>
            </tr>
            </thead>
            <tbody>
            {videos.map(({ url, video_id }) => (
                <tr key={video_id}>
                    <td className="border px-4 py-2">{url}</td>
                    <td className="border px-4 py-2">{progressMap[video_id] || "0%"}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default VideoTable;
