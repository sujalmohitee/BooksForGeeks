import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getBookById,
  getAudioProgress,
  updateAudioProgress
} from "../services/bookApi";
import "./AudiobookPlayer.css";

function AudiobookPlayer() {
  const { id } = useParams();

  const audioRef = useRef(null);

  const [book, setBook] = useState(null);
  const [savedTime, setSavedTime] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookData = await getBookById(id);
        setBook(bookData.book);

        const progressData = await getAudioProgress(id);

        setSavedTime(progressData.currentTime || 0);
      } catch (error) {
        console.error("Failed to load audiobook:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleLoadedMetadata = () => {
    if (audioRef.current && savedTime > 0) {
      audioRef.current.currentTime = savedTime;
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;

    updateAudioProgress(
      id,
      audioRef.current.currentTime
    ).catch((error) => {
      console.error(
        "Failed to save audio progress:",
        error
      );
    });
  };

  if (loading) {
    return <p>Loading audiobook...</p>;
  }

  if (!book) {
    return <p>Book not found.</p>;
  }

  if (!book.audiobookUrl) {
    return <p>Audiobook is not available for this book.</p>;
  }

  return (
  <main className="audiobook-page">
    <div className="audiobook-container">

      <div className="audiobook-header">
        <p className="section-label">AUDIOBOOK</p>

        <h1>🎧 {book.title}</h1>

        <p className="audiobook-author">
          By {book.author || "Unknown Author"}
        </p>
      </div>

      <div className="audiobook-cover">
        {book.coverImage ? (
          <img
            src={book.coverImage}
            alt={book.title}
          />
        ) : (
          <span>📖</span>
        )}
      </div>

      <div className="audiobook-player">
        <audio
          ref={audioRef}
          controls
          src={book.audiobookUrl}
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
        >
          Your browser does not support audio playback.
        </audio>
      </div>

      {savedTime > 0 && (
        <p className="audiobook-resume">
          ▶️ Resuming from{" "}
          <strong>
            {Math.floor(savedTime / 60)}m{" "}
            {Math.floor(savedTime % 60)}s
          </strong>
        </p>
      )}

    </div>
  </main>
);
}

export default AudiobookPlayer;