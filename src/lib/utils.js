export const handleLike = (element, productId, getTopFour) => {
  setTimeout(() => {
    element.style.transform = `translate(${window.innerWidth}px, ${
      window.innerHeight / 2
    }px) rotate(30deg)`;
    element.style.height = "0px";
    element.style.width = "0px";
  }, 0);
  setTimeout(() => {
    getTopFour();
  }, 500);
  console.log(`Liked Product ID: ${productId}`);
};

export const handleDislike = (element, productId, getTopFour) => {
  setTimeout(() => {
    element.style.transform = `translate(${-window.innerWidth}px, ${
      window.innerHeight / 2
    }px) rotate(-30deg)`;
    element.style.height = "0px";
    element.style.width = "0px";
  }, 0);
  setTimeout(() => {
    getTopFour();
  }, 500);
  console.log(`Passed Product ID: ${productId}`);
};

export const handleCart = (element, productId, getTopFour) => {
  setTimeout(() => {
    element.style.transform = `translate(${
      window.innerWidth
    }px, ${-window.innerHeight}px) rotate(30deg)`;
    element.style.height = "0px";
    element.style.width = "0px";
  }, 0);
  setTimeout(() => {
    getTopFour();
  }, 500);
  console.log(`Add to cart Product ID: ${productId}`);
};

export const handleDragEnd = (action, element, productId, getTopFour) => {
  if (!element) return;
  if (action === "like") {
    handleLike(element, productId, getTopFour);
  } else if (action === "dislike") {
    handleDislike(element, productId, getTopFour);
  } else if (action === "cart") {
    handleCart(element, productId, getTopFour);
  }
};
