import { Plus } from "lucide-react";

interface SectionProps {
  className?: string;
  id?: string;
  crosses?: boolean;
  crossesOffset?: string;
  customPaddings?: string;
  children: React.ReactNode;
}

const Section = ({
  className,
  id,
  crosses,
  crossesOffset,
  customPaddings,
  children,
}: SectionProps) => {
  return (
    <div
      id={id}
      className={`
      relative 
      ${customPaddings || "py-10 lg:py-16 xl:py-20"} 
      ${crosses ? "lg:py-32 xl:py-40" : ""} 
      ${className || ""}`}
    >
      {children}

      <div className="hidden absolute top-0 left-5 w-0.25 h-full bg-stroke-1 lg:block xl:left-10" />
      <div className="hidden absolute top-0 right-5 w-0.25 h-full bg-stroke-1 lg:block xl:right-10" />

      {crosses && (
        <>
          <div
            className={`hidden absolute top-0 left-7.5 right-7.5 h-0.25 bg-stroke-1 lg:block xl:left-10 xl:right-10 ${
              crossesOffset || ""
            }`}
          />
          <Plus className="hidden absolute top-0 left-[1.1rem] z-10 text-stroke-1 lg:block xl:left-[2.1rem]" />
          <Plus className="hidden absolute top-0 right-[1.1rem] z-10 text-stroke-1 lg:block xl:right-[2.1rem]" />
        </>
      )}
    </div>
  );
};

export default Section;