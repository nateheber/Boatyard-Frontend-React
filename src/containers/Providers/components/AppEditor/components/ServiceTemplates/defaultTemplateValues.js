const templatesInfo = {
  lineHandling: {
    templateTitle: 'Line Handling',
    data: {
      description: 'Please Let us know at least thirty minutes before you expect to arrive back at the dock, and your friendly staff would be happy to help you tie up at your slip.',
      textAreaLabel: 'How many bags?',
      buttonText: 'Submit',
    }
  },
  trashPickup: {
    templateTitle: 'TrashPickup',
    data: {
      cost: '10.00',
      unit: 'bag',
      description: `Our helpful staff will be happy to arrange pick up of regulated trash from your yacht at a time that is convenient for you.`,
      secondaryDescription: `Please let us know how many bags of trash you need removed, and we will be in touch to schedule your service.`,
      textAreaLabel: 'How many bags?',
      buttonText: 'Submit',
    }
  },
  pumpOut: {
    templateTitle: 'Pump Out',
    data: {
      cost: '4.00',
      unit: 'gallon',
      subtitle: 'Pump-Out',
      description: `Our helpful staff is available upon request to provide marine pump-out services at your slip.`,
      secondaryDescription: `Does your holding tank require a special fitting for pump-outs?`,
      inputLabel: 'Special  Fittings',
      buttonText: 'Schedule'
    }
  },
  boatWash: {
    templateTitle: 'Boat Wash',
    data: {
      cost: '4.00',
      unit: 'ft',
      subtitle: 'Boat Wash',
      description: 'Prevention is a lot cheaper than a cure. Keeping your boat properly cleaned will help you avoid costly compounding and wet sanding to restore your boat’s gel coat down the road. The best way to preserve your boat’s looks and shine is by washing it at least twice a month.',
      listDescription: 'Our Crew throughly washes and dries:',
      listItems: [
        'Topside',
        'Glass',
        'Stainless',
        'Outboard Motors or Drives',
        'Around All Hatches'
      ],
      buttonText: 'Schedule'
    }
  },
  fuel: {
    templateTitle: 'Fuel',
    data: {
      cost: '3.50',
      unit: 'gal',
      buttonText: 'schedule',
      description: `Our fuel prices include all taxes and fees.`,
      secondaryDescription: `Fuel prices fluctuate daily. If there is a change in price, a confirmation will be sent on the day of delivery with a final price for your approval. Your credit card will not be charged until your delivery is completed.`
    }
  }
};

export default templatesInfo;