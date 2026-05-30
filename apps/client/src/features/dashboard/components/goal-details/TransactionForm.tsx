import ButtonPrimary from '../../../../components/ButtonPrimary';

export default function TransactionForm() {
  return (
    <form className="rounded-12 grid gap-250 border border-neutral-600 bg-neutral-800 p-200 md:gap-300 md:p-300">
      <h2 className="text-preset-4">Add deposit</h2>

      <div className="grid gap-250">
        <label className="grid gap-125">
          <span>Amount*</span>
          <input
            className="rounded-8 border border-neutral-500 bg-neutral-700 p-200"
            type="text"
            name="amount"
            placeholder="0.00"
            required
          />
        </label>

        <label className="grid gap-125">
          <span>Note (optional)</span>
          <input
            className="rounded-8 border border-neutral-500 bg-neutral-700 p-200"
            type="text"
            name="note"
            placeholder="e.g. Monthly savings"
          />
        </label>
      </div>

      <ButtonPrimary type="submit" text="Add funds" />
    </form>
  );
}
