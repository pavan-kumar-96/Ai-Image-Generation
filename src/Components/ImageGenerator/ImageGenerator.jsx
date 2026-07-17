import React, { useRef, useState } from "react";
import "./ImageGenerator.css";
import default_image from "../Assets/image.png";

const ImageGenerator = () => {
    const [image_url, setImage_url] = useState("/");
    const [loading, setLoading] = useState(false);

    const inputRef = useRef(null);

    const imageGenerator = async () => {
        if (!inputRef.current.value.trim()) {
            alert("Please enter a prompt.");
            return;
        }

        setLoading(true);

        try {
            const prompt = encodeURIComponent(inputRef.current.value);

            const imageUrl = `https://image.pollinations.ai/prompt/${prompt}?width=512&height=512&seed=${Date.now()}`;

            console.log(imageUrl);

            // Preload the image
            const img = new Image();

            img.src = imageUrl;

            img.onload = () => {
                setImage_url(imageUrl);
                setLoading(false);
            };

            img.onerror = () => {
                alert("Failed to generate image.");
                setLoading(false);
            };
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <div className="ai-image-generator">
            <div className="header">
                AI Image <span>Generator</span>
            </div>

            <div className="img-loading">
                <div className="image">
                    <img
                        src={image_url === "/" ? default_image : image_url}
                        alt="Generated"
                    />
                </div>
            </div>

            <div className="search_box">
                <input
                    type="text"
                    ref={inputRef}
                    className="search-input"
                    placeholder="Describe what you want!"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            imageGenerator();
                        }
                    }}
                />

                <div
                    className="generator-btn"
                    onClick={loading ? null : imageGenerator}
                >
                    {loading ? "Generating..." : "Generate"}
                </div>
            </div>
        </div>
    );
};

export default ImageGenerator;