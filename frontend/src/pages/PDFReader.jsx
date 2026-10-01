import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useParams } from "react-router-dom";
import {
  getBookById,
  getReadingProgress,
  updateReadingProgress
} from "../services/bookApi";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "./PDFReader.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function PDFReader() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookData = await getBookById(id);
        setBook(bookData.book);

        const progressData = await getReadingProgress(id);

        setCurrentPage(progressData.currentPage || 1);
      } catch (error) {
        console.error("Failed to load PDF:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const saveProgress = async (page) => {
    if (!numPages) return;

    const progress = Math.round(
      (page / numPages) * 100
    );

    try {
      await updateReadingProgress(
        id,
        progress,
        page
      );
    } catch (error) {
      console.error(
        "Failed to save reading progress:",
        error
      );
    }
  };

  const goToNextPage = async () => {
    if (!numPages || currentPage >= numPages) {
      return;
    }

    const nextPage = currentPage + 1;

    setCurrentPage(nextPage);

    await saveProgress(nextPage);
  };

  const goToPreviousPage = async () => {
    if (currentPage <= 1) {
      return;
    }

    const previousPage = currentPage - 1;

    setCurrentPage(previousPage);

    await saveProgress(previousPage);
  };

  if (loading) {
    return <p>Loading PDF...</p>;
  }

  if (!book) {
    return <p>Book not found.</p>;
  }

  if (!book.pdfUrl) {
    return <p>PDF is not available for this book.</p>;
  }

  return (
  <main className="pdf-reader-page">
    <div className="pdf-reader-container">

      <div className="pdf-reader-header">
        <h1>{book.title}</h1>

        <p className="pdf-reader-page-info">
          Page {currentPage}
          {numPages && ` of ${numPages}`}
        </p>
      </div>

      <Document
        file={book.pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={(error) =>
          console.error("PDF loading error:", error)
        }
        loading={<p>Loading PDF...</p>}
      >
        <div className="pdf-document">
          <Page
            pageNumber={currentPage}
            width={800}
          />
        </div>
      </Document>

      <div className="pdf-controls">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage <= 1}
        >
          ← Previous
        </button>

        <button
          onClick={goToNextPage}
          disabled={
            !numPages || currentPage >= numPages
          }
        >
          Next →
        </button>
      </div>

      <div className="pdf-progress">
        <p>
          Reading Progress:{" "}
          {numPages
            ? Math.round((currentPage / numPages) * 100)
            : 0}
          %
        </p>

        <progress
          value={
            numPages
              ? Math.round((currentPage / numPages) * 100)
              : 0
          }
          max="100"
        />
      </div>

    </div>
  </main>
);
}

export default PDFReader;