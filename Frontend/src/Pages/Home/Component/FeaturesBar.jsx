import React from "react";
import { FaTruck, FaShieldAlt, FaHeadset, FaTags } from "react-icons/fa";

const FeaturesBar = () => {
  return (
    <div className="bg-[#82C8E5]/20 rounded-xl max-w-7xl mx-auto px-8 py-10 mt-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Feature 1 */}
        <div className="flex items-center gap-5">
          <div className="bg-[#0047AB] p-5 rounded-xl text-white text-2xl shadow-lg">
            <FaTruck />
          </div>
          <div>
            <h4 className="font-bold text-lg text-[#000080]">
              Return & Refund
            </h4>
            <p className="text-[#6D8196] text-sm">
              Money back guarantee
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex items-center gap-5">
          <div className="bg-[#0047AB] p-5 rounded-xl text-white text-2xl shadow-lg">
            <FaShieldAlt />
          </div>
          <div>
            <h4 className="font-bold text-lg text-[#000080]">
              Secure Payment
            </h4>
            <p className="text-[#6D8196] text-sm">
              30% off by subscribing
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex items-center gap-5">
          <div className="bg-[#0047AB] p-5 rounded-xl text-white text-2xl shadow-lg">
            <FaHeadset />
          </div>
          <div>
            <h4 className="font-bold text-lg text-[#000080]">
              Quality Support
            </h4>
            <p className="text-[#6D8196] text-sm">
              Always online 24/7
            </p>
          </div>
        </div>

        {/* Feature 4 */}
        <div className="flex items-center gap-5">
          <div className="bg-[#0047AB] p-5 rounded-xl text-white text-2xl shadow-lg">
            <FaTags />
          </div>
          <div>
            <h4 className="font-bold text-lg text-[#000080]">
              Daily Offers
            </h4>
            <p className="text-[#6D8196] text-sm">
              20% off by subscribing
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FeaturesBar;
