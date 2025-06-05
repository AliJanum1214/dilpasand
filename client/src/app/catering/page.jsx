import DilpasandInfo from "@/components/dilpasand-info/dilpasandInfo";
import { Mail, Phone } from "lucide-react";
import React from "react";

export default function Catering() {
  return (
    <div className="bg-custom-primary pt-32 pb-20">
      <div className="max-w-6xl mx-auto text-white px-4">
        <h3 className="text-2xl md:text-4xl text-custom-secondary text-center mb-12">
          Organize your occasion With Dilpasand
        </h3>
        <img src="./images/catering.webp" alt="" className="w-full h-auto" />
        <div className="flex flex-col space-y-4 mt-8">
          <p>
            Planning a special occasion? Let Dilpasand take care of the food,
            and more. Whether it’s a birthday, wedding, engagement, or a big
            family get-together, we bring proper Pakistani hospitality straight
            to your home.
          </p>
          <p>
            Our team sets up live BBQ stations at your event, grilling fresh
            tikka, seekh kebabs, and juicy chops right in front of your guests.
            We also cook up rich, flavour-packed handis, the kind you'd find at
            the iconic eateries of Karachi’s Burns road. Imagine getting a fry
            kebab being cooked live or Sabri’s mix grill being bbq’ed live for
            your guests in London.
          </p>
          <p>
            Need help beyond just the food? We also offer light-touch event
            management, helping you with setup, serving, and making sure
            everything runs smoothly. From small home functions to large-scale
            celebrations, we’ve got the experience to make sure your guests are
            well fed and well looked after.
          </p>
          <h5>
            Get in touch to build a custom menu and event plan that works for
            you.
          </h5>
          <div className="flex justify-center items-center mt-5">
            <div className="bg-custom-secondary p-4 rounded-lg">
              <DilpasandInfo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
