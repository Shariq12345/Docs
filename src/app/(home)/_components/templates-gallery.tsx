"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { templates } from "@/constants/templates";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";

export const TemplatesGallery = () => {
  const router = useRouter();
  const create = useMutation(api.documents.createDocument);
  const [isCreating, setIsCreating] = React.useState(false);

  const onTemplateClick = (title: string, initialContent: string) => {
    setIsCreating(true);
    create({ title, initialContent })
      .catch(() => {
        toast.error("Failed to create document!");
      })
      .then((documentId) => {
        router.push(`/documents/${documentId}`);
        toast.success("Document created!", {
          duration: 800,
        });
        setTimeout(() => {
          toast.info("Redirecting...", {
            duration: 500,
          });
        }, 1000);
      })
      .finally(() => {
        setIsCreating(false);
      });
  };

  return (
    <div className="bg-[#f1f3f4]">
      <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-y-4">
        <h3 className="font-medium">Start a new document</h3>
        <Carousel
          opts={{
            align: "start",
            slidesToScroll: "auto",
          }}
        >
          <CarouselContent className="-ml-4">
            {templates.map((template) => (
              <CarouselItem
                key={template.id}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714%] pl-4"
              >
                <div
                  className={cn(
                    "aspect-[3/4] flex flex-col gap-y-2.5",
                    isCreating && "pointer-events-none opacity-50"
                  )}
                >
                  <button
                    disabled={isCreating}
                    onClick={() =>
                      onTemplateClick(
                        template.label,
                        template.initialContent || ""
                      )
                    }
                    style={{
                      backgroundImage: `url(${template.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="size-full hover:border-blue-500 rounded-sm border hover:bg-blue-50 transition flex flex-col items-center justify-center gap-y-4 bg-white"
                  />
                  <p className="text-sm font-medium truncate">
                    {template.label}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

// "use client";
// import React from "react";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { cn } from "@/lib/utils";
// import { templates } from "@/constants/templates";

// export const TemplatesGallery = () => {
//   const isCreating = false;
//   return (
//     <div className="bg-white/90 backdrop-blur-sm shadow-sm">
//       <div className="max-w-screen-xl mx-auto px-4 md:px-16 py-8">
//         <h3 className="text-xl font-semibold text-neutral-800 mb-6">
//           Start a new document
//         </h3>
//         <Carousel
//           opts={{
//             align: "start",
//             slidesToScroll: "auto",
//           }}
//         >
//           <CarouselContent className="-ml-4">
//             {templates.map((template) => (
//               <CarouselItem
//                 key={template.id}
//                 className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714%] pl-4"
//               >
//                 <div
//                   className={cn(
//                     "group aspect-[3/4] flex flex-col gap-y-3",
//                     isCreating && "pointer-events-none opacity-50"
//                   )}
//                 >
//                   <button
//                     disabled={isCreating}
//                     onClick={() => {}}
//                     style={{
//                       backgroundImage: `url(${template.imageUrl})`,
//                       backgroundSize: "cover",
//                       backgroundPosition: "center",
//                       backgroundRepeat: "no-repeat",
//                     }}
//                     className="
//                       size-full
//                       rounded-xl
//                       border
//                       border-neutral-200
//                       transition-all
//                       duration-300
//                       hover:border-primary-500
//                       hover:shadow-lg
//                       group-hover:scale-[1.03]
//                       bg-white
//                       overflow-hidden
//                     "
//                   />
//                   <p
//                     className="
//                     text-sm
//                     font-medium
//                     text-neutral-700
//                     truncate
//                     group-hover:text-primary-600
//                     transition-colors
//                   "
//                   >
//                     {template.label}
//                   </p>
//                 </div>
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//           <div
//             className="
//             absolute
//             top-1/2
//             -translate-y-1/2
//             w-full
//             flex
//             justify-between
//             pointer-events-none
//           "
//           >
//             <CarouselPrevious
//               className="
//                 pointer-events-auto
//                 bg-white/80
//                 backdrop-blur-sm
//                 shadow-md
//                 hover:bg-neutral-100
//               "
//             />
//             <CarouselNext
//               className="
//                 pointer-events-auto
//                 bg-white/80
//                 backdrop-blur-sm
//                 shadow-md
//                 hover:bg-neutral-100
//               "
//             />
//           </div>
//         </Carousel>
//       </div>
//     </div>
//   );
// };
