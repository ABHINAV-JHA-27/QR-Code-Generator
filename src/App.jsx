import { useState } from "react";
import QRCode from "react-qr-code";

import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

function App() {
    const [value, setValue] = useState("");
    const [showQR, setShowQR] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);
    const [dropdownText, setDropdownText] = useState("Choose Size");
    const [size, setSize] = useState(256);

    const handleGenarate = () => {
        if (value === "") {
            alert("Please enter some text to generate QR Code");
            return;
        }
        setShowQR(false);
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setShowQR(true);
        }, 1500);
    };

    const handleDownload = () => {
        const element = document.getElementById("qrcode");
        html2canvas(element).then((canvas) => {
            canvas.toBlob((blob) => {
                saveAs(blob, "image.png");
            });
        });
    };

    const handleShowDropDown = () => {
        setShowDropDown(true);
    };

    const handleSelect = (e) => {
        setDropdownText(e.target.innerText);
        setShowDropDown(false);
    };

    return (
        <div className="w-[100%] min-h-[100vh] flex flex-col items-center bg-gradient-to-r from-purple-500 to-pink-500">
            <div className="flex md:flex-row flex-col mt-5 items-center">
                <h1 className="text-fuchsia-950 md:text-4xl text-2xl">
                    QR Code
                </h1>
                <h1 className="md:px-1 text-purple-700 md:text-4xl text-2xl">
                    {" "}
                    Generator
                </h1>
            </div>
            <div className="flex md:w-[50%] w-[75%] my-5 mt-10">
                <input
                    type="text"
                    placeholder="Enter text to generate QR Code"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="outline-none rounded-[15px] p-3 glassmorphism text-black w-full"
                />
            </div>
            <div className="mb-5 flex flex-row md:w-[50%] w-[75%] justify-around gap-x-2">
                <div className="p-3 glassmorphism rounded-[15px] px-5 relative">
                    <button onClick={handleShowDropDown}>{dropdownText}</button>
                    {showDropDown && (
                        <div className="z-10 bg-white rounded-[15px] absolute w-full">
                            <ul className="py-2 text-sm">
                                <li>
                                    <button
                                        className="flex flex-row px-4 py-2 hover:bg-gray-300"
                                        onClick={(e) => {
                                            handleSelect(e);
                                            setShowQR(false);
                                            setSize(128);
                                        }}
                                    >
                                        128 X 128
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="flex flex-row px-4 py-2 hover:bg-gray-300"
                                        onClick={(e) => {
                                            handleSelect(e);
                                            setShowQR(false);
                                            setSize(256);
                                        }}
                                    >
                                        256 X 256
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="flex flex-row px-4 py-2 hover:bg-gray-300"
                                        onClick={(e) => {
                                            handleSelect(e);
                                            setShowQR(false);
                                            setSize(320);
                                        }}
                                    >
                                        320 X 320
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="flex flex-row px-4 py-2 hover:bg-gray-300"
                                        onClick={(e) => {
                                            handleSelect(e);
                                            setShowQR(false);
                                            setSize(640);
                                        }}
                                    >
                                        640 X 640
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
                <div className="p-3 glassmorphism rounded-[15px] px-5">
                    <button onClick={handleGenarate}>Generate QR</button>
                </div>
            </div>
            {loading && (
                <div>
                    <p>Generating QR Code...</p>
                </div>
            )}
            {showQR && (
                <>
                    <div className="flex md:w-[50%] md:h-[50%] w-[75%] h-[50%] bg-white items-center justify-center rounded-[15px] p-5">
                        <div
                            id="qrcode"
                            className="border-5 border-black outline p-5 rounded-[15px]"
                        >
                            <QRCode
                                size={size}
                                style={{
                                    maxHeight: "100%",
                                    maxWidth: "100%",
                                    height: "100%",
                                    width: "100%",
                                }}
                                value={value}
                                viewBox={`0 0 256 256`}
                            />
                        </div>
                    </div>
                    <div className="mt-5 p-3 px-5 glassmorphism rounded-[15px]">
                        <button onClick={handleDownload}>Download</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
