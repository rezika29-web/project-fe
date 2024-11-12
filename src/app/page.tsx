import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Biro Umum',
}

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <p>SISTEM LAYANAN BIRO UMUM</p>
        </div>
      </main>
    </div>
  );
}


// "use client";

// export default function Home() {
//   return (
//     <div className="p-6">
//       <div className="flex-col mb-6">
//         <div className="flex mb-10 justify-center">
//           <h1 style={{ color: "black", width: "bold" }}>Home</h1>
//         </div>
//       </div>
//     </div>
//   );
// }
