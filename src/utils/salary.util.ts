export const calculateBonus = (role: string, metrics: any) => {
  switch (role) {
    case "developer":
      return (metrics.completedTasks || 0) * 200;

    case "caller":
      return (metrics.offers || 0) * 2000;

    case "bidder":
      return (metrics.submissions || 0) * 50;

    default:
      return 0;
  }
};