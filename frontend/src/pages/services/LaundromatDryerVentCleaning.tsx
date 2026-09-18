import React from 'react';
import ServiceDetailLayout from '@/components/ServiceDetailLayout';

const LaundromatDryerVentCleaning = () => (
  <ServiceDetailLayout
    seoTitle="Laundromat Dryer Vent Cleaning LA"
    seoDescription="Commercial dryer vent cleaning for Los Angeles laundromats and shared laundry rooms. Cut fire risk, shorten dry times, lower gas costs. Call (213) 792-4145."
    path="/services/laundromat-dryer-vent-cleaning"
    breadcrumbLabel="Laundromat Dryer Vents"
    serviceName="Laundromat and Commercial Dryer Vent Cleaning"
    h1="Laundromat Dryer Vent Cleaning in Los Angeles"
    intro="High-volume dryers produce lint far faster than domestic machines. For laundromats and shared laundry rooms, vent cleaning is a fire-prevention measure with a direct payback in gas and turnaround time."
    sections={[
      {
        heading: 'Why laundromats are a different job',
        body:
          'A household dryer runs a few loads a week. A laundromat machine may run continuously for twelve hours a day, and the lint load scales with it. Commercial installations also tend to have long shared duct runs serving banks of machines, often routed through walls or up to a roof termination, which means more surface for lint to settle on and more places for a restriction to develop out of sight.',
        bullets: [
          'Continuous operation producing lint at many times domestic rates',
          'Long shared duct runs serving multiple machines',
          'Booster fans that themselves accumulate lint and lose efficiency',
          'Rooftop or long horizontal terminations that are rarely inspected',
        ],
      },
      {
        heading: 'The fire risk is the headline, but not the only cost',
        body:
          'Lint is highly combustible and dryers supply both heat and airflow, which is why clogged vents are a well-documented cause of laundry fires. That is the reason to stay on a schedule. The operational costs are what make it pay for itself in between.',
        bullets: [
          'Restricted airflow means longer cycles and higher gas consumption per load',
          'Machines run hotter, which shortens component life and increases service calls',
          'Longer dry times reduce throughput, which directly limits revenue per machine',
          'Insurers and fire inspectors increasingly ask for a maintenance record',
        ],
      },
      {
        heading: 'How we work around an operating business',
        body:
          'A laundromat that is closed is not earning. We schedule around your quietest hours or overnight, and work through the machine bank in sections so the floor never goes fully offline. For shared laundry rooms in apartment buildings, we coordinate with property management on resident notice so nobody is caught out mid-load.',
        bullets: [
          'Overnight or off-peak scheduling to protect trading hours',
          'Section-by-section work so machines stay available throughout',
          'Full duct run cleared from machine connection to exterior termination',
          'Booster fans cleaned and terminations checked for correct operation',
          'Before-and-after documentation for your maintenance and insurance records',
        ],
      },
      {
        heading: 'How often it needs doing',
        body:
          'Frequency follows volume rather than the calendar. A busy laundromat may need quarterly attention; a small shared laundry room in an apartment building is often fine annually. The practical test is whether dry times have crept up — that is usually the first symptom of a restriction, and it appears well before anything becomes dangerous.',
      },
    ]}
    faqs={[
      {
        question: 'How often should a laundromat clean its dryer vents?',
        answer:
          'It depends on volume. High-traffic laundromats commonly need quarterly service, while lower-volume or shared residential laundry rooms are often adequate on a semi-annual or annual schedule. If dry times are increasing, the interval is already too long.',
      },
      {
        question: 'Can you work without closing the laundromat?',
        answer:
          'Yes. We work overnight or during your quietest hours and take the machine bank in sections, so part of the floor is always available. Closing the business is rarely necessary.',
      },
      {
        question: 'Will this actually reduce our gas bill?',
        answer:
          'A restricted vent forces the dryer to run longer to shift the same moisture, so it burns more gas per load. Clearing the restriction shortens cycles. The size of the saving depends on how restricted the system had become, which is why we document the before condition.',
      },
      {
        question: 'Do you handle apartment building shared laundry rooms?',
        answer:
          'Yes, and they are among the most commonly neglected systems we see, because no individual resident treats the vent as their responsibility. We coordinate with property management on scheduling and resident notice.',
      },
      {
        question: 'Do you provide documentation for insurance or inspection?',
        answer:
          'Yes. Every job includes before-and-after documentation and a written service report, which operators keep for insurance requirements and fire inspections.',
      },
    ]}
    relatedLinks={[
      { label: 'Commercial dryer vent cleaning', path: '/services/commercial-dryer-vent-cleaning' },
      { label: 'Dryer vent maintenance program', path: '/services/dryer-vent-maintenance-program' },
      { label: 'Property managers and HOAs', path: '/property-managers' },
    ]}
  />
);

export default LaundromatDryerVentCleaning;
