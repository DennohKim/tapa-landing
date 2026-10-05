import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[26rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

/** Title and description on top, visual below, as in the reference cards. */
export const BentoGridItem = ({
  className,
  title,
  description,
  header,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento row-span-1 flex flex-col gap-6 overflow-hidden rounded-3xl border border-stone-200/80 bg-white p-7 transition duration-300 hover:shadow-[0_24px_60px_-28px_rgba(28,25,23,0.25)]",
        className,
      )}
    >
      <div className="transition duration-300 group-hover/bento:translate-x-1">
        <h3 className="text-2xl leading-tight font-medium tracking-tight text-balance text-stone-950">
          {title}
        </h3>
        <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-stone-500">
          {description}
        </p>
      </div>
      {header}
    </div>
  );
};
