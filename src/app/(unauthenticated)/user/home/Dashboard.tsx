"use client";
import ParticipantChart from "@/components/ParticipantChart";

export default function Dashboard() {
  return (
    <div className="p-6">
      <div className="flex-col mb-6">
        <div className="flex mb-10 justify-center">
          <div className="flex w-full " >

            <ParticipantChart />
          </div>
        </div>
      </div>
    </div>
  );
}
