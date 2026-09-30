import { jsPDF } from 'jspdf';
import { formatCurrency, formatDate } from './formatters.js';

export function generateItineraryPDF(itinerary) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let y = 18;

  const checkPageBreak = (neededHeight) => {
    if (y + neededHeight > pageHeight - 15) {
      doc.addPage();
      y = 18;
      // Header on subsequent pages
      doc.setFontSize(8);
      doc.setTextColor(140, 140, 140);
      doc.text(`AeroVoyage AI Itinerary • ${itinerary.tripSummary.destination}`, margin, 10);
      doc.setDrawColor(230, 230, 230);
      doc.line(margin, 12, pageWidth - margin, 12);
      return true;
    }
    return false;
  };

  // --- HEADER SECTION ---
  doc.setFillColor(15, 23, 42); // Slate 900
  doc.rect(margin, y, contentWidth, 32, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('AEROVOYAGE AI TRAVEL DOSSIER', margin + 8, y + 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(199, 210, 254); // Indigo light
  doc.text(`Architected by Manya Bhardwaj • Powered by Gemini 3 Multi-Agent Engine • Destination: ${itinerary.tripSummary.destination.toUpperCase()}`, margin + 8, y + 20);
  doc.text(`Dates: ${formatDate(itinerary.tripSummary.departureDate)} to ${formatDate(itinerary.tripSummary.returnDate)} (${itinerary.tripSummary.numberOfDays} Days) • ${itinerary.tripSummary.travelers} Traveler(s)`, margin + 8, y + 26);

  y += 38;

  // --- FINANCIAL SUMMARY BOX ---
  checkPageBreak(30);
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('BUDGET ALLOCATION & STATUS:', margin + 6, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`Total Plan Cost: ${formatCurrency(itinerary.costBreakdown.grandTotal)}`, margin + 6, y + 14);
  doc.text(`Target Budget: ${formatCurrency(itinerary.costBreakdown.budgetLimit)}`, margin + 6, y + 20);

  doc.text(`Flights: ${formatCurrency(itinerary.costBreakdown.flights)}`, margin + 65, y + 14);
  doc.text(`Lodging: ${formatCurrency(itinerary.costBreakdown.hotels)}`, margin + 65, y + 20);

  doc.text(`Activities: ${formatCurrency(itinerary.costBreakdown.activities)}`, margin + 120, y + 14);
  doc.text(`Reserve/Buffer: ${formatCurrency(itinerary.costBreakdown.remainingSavings)}`, margin + 120, y + 20);

  y += 30;

  // --- FLIGHT DETAILS ---
  checkPageBreak(40);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(30, 58, 138); // Blue 900
  doc.text('1. RECOMMENDED FLIGHTS (FLIGHTS_AGENT)', margin, y);
  y += 6;

  doc.setFillColor(239, 246, 255); // Blue 50
  doc.setDrawColor(191, 219, 254);
  doc.roundedRect(margin, y, contentWidth, 28, 2, 2, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(`${itinerary.flights.airline} • Flight ${itinerary.flights.flightNumber}`, margin + 6, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`Outbound: ${itinerary.flights.outbound.departureAirport} -> ${itinerary.flights.outbound.arrivalAirport} (${itinerary.flights.outbound.departureTime} - ${itinerary.flights.outbound.arrivalTime})`, margin + 6, y + 13);
  doc.text(`Return: ${itinerary.flights.return.departureAirport} -> ${itinerary.flights.return.arrivalAirport} (${itinerary.flights.return.departureTime} - ${itinerary.flights.return.arrivalTime})`, margin + 6, y + 18);
  doc.text(`Baggage: ${itinerary.flights.baggageAllowance}`, margin + 6, y + 23);

  doc.setFont('helvetica', 'bold');
  doc.text(`Total: ${formatCurrency(itinerary.flights.totalPrice)}`, contentWidth - 15, y + 7);

  y += 34;

  // --- ACCOMMODATION DETAILS ---
  checkPageBreak(40);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(6, 78, 59); // Emerald 900
  doc.text('2. ACCOMMODATION (HOTELS_AGENT)', margin, y);
  y += 6;

  doc.setFillColor(240, 253, 244); // Emerald 50
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(margin, y, contentWidth, 26, 2, 2, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(`${itinerary.hotel.name} (${itinerary.hotel.stars} Stars • Rating: ${itinerary.hotel.guestRating}/5)`, margin + 6, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`Neighborhood: ${itinerary.hotel.neighborhood} • Room: ${itinerary.hotel.roomType || 'Deluxe Room'}`, margin + 6, y + 13);
  doc.text(`Amenities: ${itinerary.hotel.amenities?.slice(0, 4).join(', ') || 'Wi-Fi, Breakfast, Metro Access'}`, margin + 6, y + 18);
  doc.text(`Duration: ${itinerary.hotel.numberOfNights} Nights • Total: ${formatCurrency(itinerary.hotel.totalCost)} (Includes taxes & fees)`, margin + 6, y + 23);

  y += 32;

  // --- DAY BY DAY ITINERARY ---
  checkPageBreak(30);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(120, 53, 15); // Amber 900
  doc.text('3. DAY-BY-DAY CURATED SCHEDULE & TRANSIT TIMES', margin, y);
  y += 8;

  itinerary.dailyPlans.forEach(day => {
    checkPageBreak(50);

    // Day Header
    doc.setFillColor(241, 245, 249);
    doc.rect(margin, y, contentWidth, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(`DAY ${day.dayNumber}: ${day.theme}`, margin + 4, y + 5);
    y += 10;

    day.activities.forEach(act => {
      checkPageBreak(22);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(79, 70, 229); // Indigo 600
      doc.text(`[${act.timeSlot.split(' ')[0]}] ${act.name}`, margin + 6, y);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(51, 65, 85);
      y += 4.5;
      doc.text(`Highlights: ${act.highlights}`, margin + 10, y, { maxWidth: contentWidth - 15 });

      y += 4.5;
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(100, 116, 139);
      doc.text(`Transit Route: ${act.validatedTransit || act.transitFromPrev || 'Direct local walk/metro'}`, margin + 10, y, { maxWidth: contentWidth - 15 });

      y += 6;
    });

    y += 4;
  });

  // Footer on final page
  checkPageBreak(20);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(140, 140, 140);
  doc.text(`AeroVoyage Multi-Agent Travel Planner • Architected by Manya Bhardwaj • Generated on ${new Date().toLocaleDateString()} • Happy & Safe Travels!`, margin, y + 10);

  // Save the PDF
  const filename = `AeroVoyage_Itinerary_${itinerary.tripSummary.destination.replace(/\s+/g, '_')}_${itinerary.tripSummary.numberOfDays}Days.pdf`;
  doc.save(filename);
}
