import { useEffect } from "react";
import { fireConfetti, fireConfettiFromSides } from "@/lib/confetti";

const ConfettiListener = () => {
  useEffect(() => {
    const handleCartAdd = () => {
      fireConfetti(
        window.innerWidth / 2 + (Math.random() - 0.5) * 200,
        window.innerHeight / 3,
        40
      );
    };

    const handleOrder = () => {
      fireConfettiFromSides();
      setTimeout(() => {
        fireConfetti(window.innerWidth / 2, window.innerHeight / 4, 100);
      }, 500);
    };

    const handleAchievement = () => {
      fireConfetti(window.innerWidth / 2, window.innerHeight / 2, 60);
    };

    const handleSecret = () => {
      fireConfettiFromSides();
    };

    window.addEventListener("fisz-cart-add", handleCartAdd);
    window.addEventListener("fisz-order-complete", handleOrder);
    window.addEventListener("fisz-achievement", handleAchievement);
    window.addEventListener("fisz-secret-unlocked", handleSecret);

    return () => {
      window.removeEventListener("fisz-cart-add", handleCartAdd);
      window.removeEventListener("fisz-order-complete", handleOrder);
      window.removeEventListener("fisz-achievement", handleAchievement);
      window.removeEventListener("fisz-secret-unlocked", handleSecret);
    };
  }, []);

  return null;
};

export default ConfettiListener;