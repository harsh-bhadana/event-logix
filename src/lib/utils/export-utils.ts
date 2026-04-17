/**
 * Utility to download data as a CSV file.
 * @param filename - Name of the file to save (e.g., 'report.csv')
 * @param headers - Array of header names
 * @param data - Array of objects containing the data
 */
export function downloadCSV(filename: string, headers: string[], data: any[]) {
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header] ?? '';
        // Escape quotes and wrap in quotes if contains comma
        const escaped = String(value).replace(/"/g, '""');
        return escaped.includes(',') ? `"${escaped}"` : escaped;
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

/**
 * Basic PDF report generator using browser's print functionality.
 * This is preferred for high-fidelity layouts that match the UI.
 */
export function printReport() {
  if (typeof window !== 'undefined') {
    window.print();
  }
}
