import Goals from '../../features/dashboard/components/home/GoalsList';
import Summary from '../../features/dashboard/components/home/Summary';

export default function Home() {
  return (
    <div className="grid gap-400 py-400 md:py-600">
      <Summary />
      <Goals />
    </div>
  );
}
