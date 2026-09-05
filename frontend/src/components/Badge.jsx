const styles = {
  success: "bg-success/10 text-success",
  danger: "bg-danger/10 text-danger",
  warning: "bg-warning/10 text-warning",
  neutral: "bg-gray-200 text-gray-600",
};

export default function Badge({ tone = "neutral", children }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${styles[tone] ?? styles.neutral}`}
    >
      {children}
    </span>
  );
}
