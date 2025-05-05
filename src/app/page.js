"use client";
import { useState, useEffect } from "react";
import { ShoppingCart, ThumbsUp, ThumbsDown } from "lucide-react";
import data from "../../public/data.json";
import { ProductCard } from "@/components/ProductCard";
import { handleDragEnd } from "@/lib/utils";

export default function SwipeAndShop() {
  const [posShift, setPosShift] = useState({ x: 0, y: 0 });
  const [action, setAction] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [topFour, setTopFour] = useState([0, 1, 2, 3]);

  const getTopFour = () => {
    setTopFour((prev) => [
      prev[1],
      prev[2],
      prev[3],
      topFour[3] < data.length - 1 ? topFour[3] + 1 : 0,
    ]);
  };

  const getSwipeDir = (deltaX, deltaY) => {
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // horizontal swipe
      setPosShift({ x: deltaX, y: 0 });
      if (deltaX < -30) setAction("dislike");
      else if (deltaX > 30) setAction("like");
      else setAction(null);
    } else {
      if (deltaY < 0) {
        // vertical up swipe (cart)
        setPosShift({ x: 0, y: deltaY });
        if (deltaY < -30) setAction("cart");
        else setAction(null);
      }
    }
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartPos({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPos({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;

    const deltaX = e.touches[0].clientX - startPos.x;
    const deltaY = e.touches[0].clientY - startPos.y;

    getSwipeDir(deltaX, deltaY);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;

    getSwipeDir(deltaX, deltaY);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    const element = document.getElementById("card-" + topFour[0]);
    handleDragEnd(action, element, data[topFour[0]].id, getTopFour);

    setIsDragging(false);
    setAction(null);
    setPosShift({ x: 0, y: 0 });
  };

  const handleMouseUp = () => {
    handleTouchEnd();
  };

  useEffect(() => {
    const handleGlobalEnd = () => {
      if (isDragging) {
        handleTouchEnd();
      }
    };

    window.addEventListener("mouseup", handleGlobalEnd);
    window.addEventListener("touchend", handleGlobalEnd);

    return () => {
      window.removeEventListener("mouseup", handleGlobalEnd);
      window.removeEventListener("touchend", handleGlobalEnd);
    };
  }, [isDragging]);

  const getSwipeVisualStyle = () => {
    if (action === "like") {
      return "bg-green-300/20";
    } else if (action === "dislike") {
      return "bg-red-300/20";
    } else if (action === "cart") {
      return "bg-blue-300/20";
    }
    return "";
  };

  return (
    <div className="flex items-center justify-center h-screen w-full overflow-hidden bg-gradient-to-r from-red-50 via-blue-50 to-green-50 text-gray-800 font-sans">
      {topFour.map((productIdx, index) =>
        index === 0 ? (
          <div
            className="relative z-[100] flex h-[80%] w-[85%] max-h-[650px] max-w-[380px] overflow-hidden rounded-2xl shadow-xl cursor-grab active:cursor-grabbing"
            id={`card-${productIdx}`}
            key={productIdx}
            style={{
              transform: `translate(${posShift.x}px, ${posShift.y}px) rotate(${
                posShift.x * 0.1
              }deg)`,
              transition: isDragging
                ? "none"
                : "transform 1s ease, opacity 1s ease, width 0.5s ease, height 0.5s ease",
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <div
              className={`absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-200 ${
                action ? "opacity-100" : "opacity-0"
              } ${getSwipeVisualStyle()}`}
            >
              {action === "like" && (
                <ThumbsUp size={64} className="text-green-500" />
              )}
              {action === "dislike" && (
                <ThumbsDown size={64} className="text-red-500" />
              )}
              {action === "cart" && (
                <ShoppingCart size={64} className="text-blue-500" />
              )}
            </div>
            <ProductCard product={data[productIdx]} />
          </div>
        ) : (
          <div
            className={`absolute ${
              index === 1
                ? "z-50 h-[80vh] w-[85%]"
                : index === 2
                ? "z-[40] bottom-[12%] h-[80vh] w-[81%]"
                : "z-[30] top-[12%] h-[80vh] w-[81%]"
            } max-h-[650px] max-w-[380px] flex overflow-hidden rounded-2xl shadow-xl cursor-grab active:cursor-grabbing`}
            id={`card-${productIdx}`}
            key={productIdx}
          >
            <ProductCard product={data[productIdx]} />
          </div>
        )
      )}
    </div>
  );
}
