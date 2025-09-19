"use client";
import React from "react";
import Image from "next/image";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import {
  CalendarIcon2,
  ClockIcon,
  DownloadIcon,
  LanguageIcon,
  LiveClassIcon,
  ScheduleIcon,
} from "../icons";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CartStore } from "@/types";

interface CourseEnrollCardProps {
  type: 'course' | 'test_series'; // Changed from string to specific union type
  heading: string;
  instructors: string[];
  price: number;
  originalPrice?: number;
  languages: string | undefined;
  features: string[];
  enrollmentDeadline: string | undefined;
  contactPhone: string;
  contactAddress: string;
  duration: string;
  image: string;
  videoLacture: string | undefined;
  question: string | undefined;
  studyMaterial?: { name: string; url: string }[]; // multiple files
  timeTable: string | undefined | null;
  slug: string;
}

const CourseEnrollCard: React.FC<CourseEnrollCardProps> = ({
  heading,
  instructors,
  studyMaterial,
  timeTable,
  image,
  price,
  originalPrice,
  languages,
  type,
  features,
  enrollmentDeadline,
  contactPhone,
  contactAddress,
  duration,
  question,
  videoLacture,
  slug,
}) => {
  // PDF selection state
  const [selectedPDFs, setSelectedPDFs] = React.useState<Set<string>>(new Set());
  const [isAllSelected, setIsAllSelected] = React.useState(false);
  const [isDownloading, setIsDownloading] = React.useState(false);

  // Handle individual PDF selection
  const handlePDFSelection = (pdfUrl: string) => {
    const newSelected = new Set(selectedPDFs);
    if (newSelected.has(pdfUrl)) {
      newSelected.delete(pdfUrl);
    } else {
      newSelected.add(pdfUrl);
    }
    setSelectedPDFs(newSelected);
    setIsAllSelected(newSelected.size === (studyMaterial?.length || 0));
  };

  // Handle select all / deselect all
  const handleSelectAll = () => {
    if (!studyMaterial) return;
    
    if (isAllSelected) {
      setSelectedPDFs(new Set());
      setIsAllSelected(false);
    } else {
      const allPDFs = new Set(studyMaterial.map(pdf => pdf.url));
      setSelectedPDFs(allPDFs);
      setIsAllSelected(true);
    }
  };

  // Download selected PDFs (Fixed approach for proper downloads)
  const downloadSelected = () => {
    if (selectedPDFs.size === 0) {
      alert('Please select at least one PDF to download.');
      return;
    }

    setIsDownloading(true);

    // Create and trigger downloads for each selected PDF
    Array.from(selectedPDFs).forEach((pdfUrl, index) => {
      setTimeout(() => {
        // Extract clean filename from URL
        const urlParts = pdfUrl.split('/');
        const filename = urlParts[urlParts.length - 1] || `download-${index + 1}.pdf`;
        
        // Create a hidden anchor element and trigger download
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = filename; // This forces download instead of opening
        link.style.display = 'none';
        link.rel = 'noopener'; // Security best practice
        
        // Add to DOM, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log(`Download triggered for: ${filename}`);
        
        // Reset downloading state after last file
        if (index === selectedPDFs.size - 1) {
          setTimeout(() => {
            setIsDownloading(false);
          }, 1000);
        }
      }, index * 300); // Shorter delay to avoid browser blocking
    });
    
    console.log(`Starting download for ${selectedPDFs.size} files`);
  };

  const { addCourse } = useCartStore();
  const router = useRouter();

  const handleAddToCart = () => {
    const cartStore: CartStore = {
      type: type,
      slug: slug,
      heading: heading,
      faculty: instructors?.map((data) => data),
      duration: duration,
      price: price,
      image: image,
    };
    addCourse(cartStore);
    toast.success("Items is added to your cart");
  };

  // Study Material with prefix removed and sorted
  const formattedStudyMaterial = studyMaterial
    ?.map((file) => {
      // prefix remove karna
      const cleanName = file.name.includes("_")
        ? file.name.split("_").slice(1).join("_")
        : file.name;

      // return new object with clean name
      return { ...file, name: cleanName };
    })
    .sort((a, b) => a.name.localeCompare(b.name)); // ascending order

  return (
    <div className="flex flex-col gap-6">
      {/* Main Card */}
      <div className="bg-white py-5 rounded-lg overflow-hidden shadow-orange shadow-sm border border-[#FF7B07]/60">
        <div className="relative h-64 w-full">
          <Image
            src={image ?? "/images/placeholder.png"}
            alt="Course prep materials"
            fill
            className="object-cover"
          />
        </div>

        <div className="p-4 space-y-4">
          <div className="flex justify-between gap-x-3">
            <div className="text-[#FF7B07] bg-gradient-to-r from-[#FFE9E9] to-[#FFF5EC] px-4 py-1 text-xs rounded-full">
              {duration}
            </div>

            <div className="flex gap-2">
              {instructors.map((data, i) => (
                <div
                  key={i}
                  className="text-[#FF7B07] bg-gradient-to-r from-[#FFE9E9] to-[#FFF5EC] px-4 py-1 text-xs rounded-full"
                >
                  {data}
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-lg font-bold mb-2">{heading}</h2>

          {languages && (
            <div className="flex items-center gap-2 mb-3">
              <LanguageIcon className="text-orange h-6 w-6" />
              <span className="text-sm text-gray-700">{languages}</span>
            </div>
          )}

          {question && (
            <div className="flex items-center gap-2 mb-3">
              <ScheduleIcon className="text-orange h-6 w-6" />
              <span className="text-sm text-gray-700">{question}</span>
            </div>
          )}

          {videoLacture && (
            <div className="flex items-center gap-2 mb-3">
              <LiveClassIcon className="text-orange h-6 w-6" />
              <span className="text-sm text-gray-700">{videoLacture}</span>
            </div>
          )}

          <div className="flex items-center mt-4">
            <div>
              <span className="text-[#FF7B07]">
                <span className="text-3xl font-bold">₹{price}</span>
                <span className="text-[10px]">(Limited Period Offer)</span>
              </span>
              {originalPrice && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  (₹{originalPrice})
                </span>
              )}
            </div>
          </div>

          <div className="w-max mx-auto pt-3">
            <button
              onClick={handleAddToCart}
              className="text-white py-3 px-12 rounded-full w-full bg-black hover:bg-primaryred transition-all duration-500"
            >
              Enroll now
            </button>
          </div>
        </div>
      </div>

      {/* Additional Cards */}
      {(formattedStudyMaterial?.length || enrollmentDeadline || timeTable) && (
        <div className="bg-white rounded-lg overflow-hidden p-4 shadow-orange shadow-sm">
          <div className="space-y-2">
            {/* Study Materials with Selection Controls */}
            {formattedStudyMaterial && formattedStudyMaterial.length > 0 && (
              <>
                {/* Select All and Download Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 border-b border-gray-300 mb-4 gap-3 bg-gray-50 px-3 rounded-md">
                  <label className="flex items-center gap-2 cursor-pointer flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Select All ({formattedStudyMaterial.length})
                    </span>
                  </label>
                  <button
                    onClick={downloadSelected}
                    disabled={selectedPDFs.size === 0 || isDownloading}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex-shrink-0 min-w-fit whitespace-nowrap border ${
                      selectedPDFs.size === 0 || isDownloading
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300'
                        : 'bg-blue-600 text-white hover:bg-blue-700 border-blue-600 shadow-lg hover:shadow-xl transform hover:scale-105'
                    }`}
                    style={{
                      visibility: 'visible',
                      display: 'inline-block',
                      zIndex: 10
                    }}
                  >
                    {isDownloading 
                      ? `Downloading...` 
                      : `Download Selected (${selectedPDFs.size})`
                    }
                  </button>
                </div>

                {/* PDF List with Checkboxes */}
                {formattedStudyMaterial.map((file, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 border-b border-dashed border-gray-300 pb-2 transition-all ${
                      selectedPDFs.has(file.url) ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedPDFs.has(file.url)}
                      onChange={() => handlePDFSelection(file.url)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0"
                    />
                    <div
                      className="flex items-center gap-3 flex-1 cursor-pointer hover:text-orange-500 transition-colors"
                      onClick={() => {
                        // Single file download - simplified and reliable
                        const link = document.createElement('a');
                        link.href = file.url;
                        link.download = file.name; // Force download dialog
                        link.style.display = 'none';
                        link.rel = 'noopener';
                        
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        
                        console.log(`Download triggered for: ${file.name}`);
                      }}
                    >
                      <div className="text-orange flex-shrink-0">
                        <DownloadIcon className="w-8 h-8" />
                      </div>
                      <span className="font-medium text-sm truncate">{file.name}</span>
                      {selectedPDFs.has(file.url) && (
                        <div className="ml-auto">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Selected
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}

            {enrollmentDeadline && (
              <div className="flex items-center gap-3 border-b border-dashed border-gray-300 py-2">
                <ClockIcon className="w-8 h-8 text-orange" />
                <span className="text-sm">
                  <span className="font-medium">Enrollment Deadline: </span>
                  {enrollmentDeadline}
                </span>
              </div>
            )}

            {timeTable && (
              <Link
                href={timeTable}
                target="_blank"
                className="flex items-center gap-3 cursor-pointer py-2"
              >
                <CalendarIcon2 className="h-8 w-8 text-orange" />
                <span className="font-medium text-sm">Download Timetable</span>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Contact Card */}
      <div className="bg-[#DC8940]/90 text-white rounded-lg overflow-hidden shadow-sm px-4 py-8">
        <div className="mb-4 space-y-3">
          <h3 className="text-2xl font-semibold">Have any Questions?</h3>
          <p className="text-sm text-white">
            Contact us on the following details:
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <FaPhoneAlt size={16} />
            <span className="text-sm">{contactPhone}</span>
          </div>

          <div className="flex items-center gap-3">
            <FaMapMarkerAlt size={16} />
            <span className="text-sm">{contactAddress}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseEnrollCard;