"use client";

import React, { useEffect, useState, useRef } from "react";
import Background from "../Components/Background";
import Loader from "../Components/Loader";
import QRCode from "react-qr-code";
import { LandingNavbar } from "@/components/landing/navbar";
import ReactCardFlip from "react-card-flip";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);
  const reportRef = useRef();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setTimeout(() => {
      setIsModalOpen(false);
    }, 300);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const [latestData, setLatestData] = useState({
    Full_Name: "",
    Matric_Number: "",
    Passport: "",
    Phone: "",
    Wallet: "",
  });

  useEffect(() => {
    const storedData = localStorage.getItem('userCardData');
    if (storedData) {
      const userData = JSON.parse(storedData);
      setLatestData({
        Full_Name: userData.Full_Name,
        Matric_Number: userData.Matric_Number,
        Passport: userData.Passport,
        Phone: userData.Phone,
        Wallet: userData.Wallet || "0x3D39D68D2B2fBd98C40a228d56F5205218B9a33D",
      });
      setLoading(false);
    } else {
      const handleData = async () => {
        try {
          const response = await fetch("/api/create");
          if (response.ok) {
            const data = await response.json();
            console.log("Fetched Data:", data);

            const lastUser = data.data[data.data.length - 1];
            if (lastUser) {
              setLatestData({
                Full_Name: lastUser.Full_Name,
                Matric_Number: lastUser.Matric_Number,
                Passport: lastUser.Passport,
                Phone: lastUser.Phone,
                Wallet: lastUser.Wallet,
              });
            }
          } else {
            console.error("Error fetching data:", response.statusText);
          }
        } catch (error) {
          console.error("Fetch error:", error);
        } finally {
          setLoading(false);
        }
      };

      handleData();
    }
  }, []);

  const downloadPDF = async () => {
    const canvas = await html2canvas(reportRef.current, {
      scale: 2,
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    const logo = new Image();
    logo.src = "/oaulogo.png";
    logo.onload = () => {
      const logoWidth = 70;
      const logoHeight = 30;
      const logoX = (imgWidth - logoWidth) / 2;
      const logoY = 10;

      pdf.addImage(logo, "PNG", logoX, logoY, logoWidth, logoHeight);

      const date = new Date();
      const formattedDate = date.toLocaleDateString();
      const formattedTime = date.toLocaleTimeString();
      const dateTimeText = `Generated on: ${formattedDate} at ${formattedTime}`;
      const disclaimer =
        "Tender the QRcode in the ICT center for Physical ID card Collection";

      pdf.setFontSize(12);
      pdf.text(dateTimeText, imgWidth / 2, logoY + logoHeight + 10, {
        align: "center",
      });
      pdf.text(disclaimer, imgWidth / 2, logoY + logoHeight + 20, {
        align: "center",
      });

      position = logoY + logoHeight + 30;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        pdf.addPage();
        pdf.addImage(
          imgData,
          "PNG",
          0,
          position - imgHeight,
          imgWidth,
          imgHeight
        );
        heightLeft -= pageHeight;
        position = heightLeft;
      }

      const pdfName = `STUDENTID(${formattedDate.replace(
        /\//g,
        "-"
      )}_${formattedTime.replace(/:/g, "-")}).pdf`;
      pdf.save(pdfName);
    };
  };

  return (
    <div className="min-h-screen card-gradient ">
      <Toaster position="top-right" reverseOrder={false} />
      <LandingNavbar />

      <div className="flex items-center justify-center min-h-[70vh]">
        <Background />
        {loading ? (
          <Loader />
        ) : latestData ? (
          <div>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
              {/* Front Side of the Card */}
              <div className="items-center flex flex-col justify-center">
                <div className="bg-black rounded-lg p-6 w-fit min-w-[300px] h-[350px] relative">
                  <div className="flex justify-center mb-4">
                    {latestData.Passport && (
                      <img
                        src={latestData.Passport}
                        alt={latestData.Full_Name}
                        className="rounded border border-gray-300"
                        style={{ width: "100px", height: "100px" }}
                      />
                    )}
                  </div>
                  <div className="text-center mb-4">
                    <p className="text-lg text-white font-semibold">
                      {latestData.Full_Name}
                    </p>
                    <p className="text-sm text-white/70">
                      Unique ID:
                      <div>{latestData.Matric_Number || "N/A"}</div>
                    </p>
                  </div>
                  {latestData.Passport && (
                    <div className="flex justify-center mt-[60px]">
                      <img
                        src="/chip.png"
                        alt="Chip Icon"
                        className="rounded-full"
                        style={{ width: "50px", height: "50px" }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Back Side of the Card */}
              <div className="items-center flex flex-col justify-center">
                <div className="bg-black rounded-lg p-6 w-fit max-w-[300px] h-[350px] relative space-y-8">
                  <div
                    className="flex justify-center mb-20 bg-white p-1 w-fit items-center mx-auto"
                    ref={reportRef}
                  >
                    <QRCode
                      value={`Wallet ID : ${latestData.Wallet || "N/A"}, Phone : ${
                        latestData.Phone || "N/A"
                      }`}
                      size={100}
                    />
                  </div>
                  <div>
                    <p className="mt-5 text-center text-white">
                      Valid till : 20/09/25
                    </p>
                    <small className="items-center text-center block text-white px-1 mt-2">
                      This ID should be returned to the Institution ICT center if
                      found
                    </small>
                  </div>
                </div>
              </div>
            </ReactCardFlip>

            <div className="flex justify-center items-center gap-6">
              <button
                className="bg-[#471d47] border border-gray-500 text-white w-full md:w-auto h-[48px] mt-4 px-3 rounded"
                onClick={handleFlip}
              >
                Flip Card
              </button>
              <button
                className="bg-[#5e235e] border border-gray-500 text-white w-full md:w-auto h-[48px] mt-4 px-3 rounded"
                onClick={downloadPDF}
              >
                Save QRCode
              </button>
            </div>

            {/* Commented out Pay button
            <div className="flex justify-center items-center mt-4">
              <button
                className="bg-[#220c22] border border-gray-500 text-white w-full md:w-auto h-[48px] mt-4 px-8 mr-3 rounded"
                onClick={openModal}
              >
                Pay
              </button>
            </div>
            */}
            <br />

            <small>
              <i className="text-white">
                The QR code will be used to confirm your identity in the
                institution's ICT Center
              </i>
            </small>
          </div>
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
