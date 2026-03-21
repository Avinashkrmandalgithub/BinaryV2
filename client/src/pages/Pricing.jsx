import React, { useEffect, useMemo, useState } from "react";
import PricingCard from "../components/PricingCard.jsx";
import pricingData from "../data/pricingData.json";
import axios from "axios";

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [currentPayment, setCurrentPayment] = useState(null);
  const [isUpdatingPlan, setIsUpdatingPlan] = useState(false);

  const token = useMemo(() => localStorage.getItem("token"), []);

  const planIdToPayment = {
    starter: "FREE",
    pro: "MEDIUM",
    enterprise: "HIGH",
  };

  useEffect(() => {
    const fetchCurrentPlan = async () => {
      if (!token) return;

      try {
        const response = await axios.get(`${import.meta.env.VITE_JAVA_URL}/auth/plan-info`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const payment = response?.data?.payment || null;
        setCurrentPayment(payment);
      } catch (error) {
        console.error("Failed to fetch plan info:", error);
      }
    };

    fetchCurrentPlan();
  }, [token]);

  const handlePlanClick = async (plan) => {
    const targetPayment = planIdToPayment[plan.id];
    if (!targetPayment) return;

    if (!token) {
      alert("Please login first!");
      return;
    }

    if (currentPayment === targetPayment || isUpdatingPlan) return;

    setIsUpdatingPlan(true);
    setSelectedPlan(plan.id);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_JAVA_URL}/auth/change-plan`,
        { payment: targetPayment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedPayment = response?.data?.payment || targetPayment;
      setCurrentPayment(updatedPayment);
    } catch (error) {
      console.error("Failed to change plan:", error);
      alert("Failed to update plan. Please try again.");
    } finally {
      setIsUpdatingPlan(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold">Upgrade your plan</h1>
        <p className="text-gray-400 mt-2">
          Choose the best plan for your RAG system
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {pricingData.plans.map((plan) => {
          const planPayment = planIdToPayment[plan.id];
          const isCurrentPlan = currentPayment === planPayment;

          return (
            <PricingCard
              key={plan.id}
              {...plan}
              isSelected={isCurrentPlan || selectedPlan === plan.id}
              disabled={isCurrentPlan || isUpdatingPlan}
              buttonText={
                isCurrentPlan
                  ? "Current Plan"
                  : isUpdatingPlan && selectedPlan === plan.id
                    ? "Updating..."
                    : plan.buttonText
              }
              onClick={() => handlePlanClick(plan)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Pricing;
