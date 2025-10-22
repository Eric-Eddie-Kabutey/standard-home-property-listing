import type { FC } from "react";

const FeatureBlobBackground: FC<{ className?: string }> = ({ className }) => {
  return (
    <svg viewBox="0 0 500 500" className={className}>
      <path
        d="M428.2,335.5Q372,421,254.5,439.5Q137,458,95,349.5Q53,241,92,143.5Q131,46,247.5,58.5Q364,71,424.5,160.5Q485,250,428.2,335.5Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default FeatureBlobBackground;