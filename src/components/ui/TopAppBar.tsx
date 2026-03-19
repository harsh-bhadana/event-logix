export function TopAppBar({ title = "Event Wizard" }: { title?: string }) {
  return (
    <header className="bg-[#fbf9f7] dark:bg-neutral-900 flex justify-between items-center px-8 h-16 w-full fixed top-0 z-50">
      <div className="flex items-center gap-4">
        <span className="font-headline font-bold text-primary dark:text-primary-fixed tracking-tighter text-xl cursor-default">
          The Executive Ledger
        </span>
        <div className="bg-surface-variant dark:bg-neutral-800 h-6 w-[1px] mx-2"></div>
        <span className="font-headline font-semibold text-lg tracking-tight text-primary dark:text-primary-fixed cursor-default">
          {title}
        </span>
      </div>
      <div className="flex items-center gap-6">
        <button className="hover:bg-surface-container-low dark:hover:bg-neutral-800 transition-colors p-2 rounded-full active:opacity-80">
          <span className="material-symbols-outlined text-on-surface-variant">help</span>
        </button>
        <button className="hover:bg-surface-container-low dark:hover:bg-neutral-800 transition-colors p-2 rounded-full relative active:opacity-80">
          <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
        </button>
        <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant/20">
          <img
            alt="Executive User Profile"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiWw_v-imH0epl5_kWBNjoPxprxPOr_EIY1jQlLt-zhPv9mdwkCvvUWMnzN7I15iLurG7PM9az0zUtsmfXo6MRTRh1NKw6zhjI37IEFVcvLWUbBjyqirDUSbWLSuX8CBW8DybfbbfrYGBbfcI7BdJtGV0JFe0xOqrbfaIx2x9V0u5-rSmJ3nT3t591Xckyvis_YjrwLqwE6mNwt3j9ppsqvaqTwWBQW8dUhBxMfv4dnx2FefyqSFHKnsddpAxItSRHz6pM_Q8vyIms"
          />
        </div>
      </div>
    </header>
  );
}
