const templatesInfo = {
  request: {
    templateName: 'Request',
    templateTitle: 'Electrical Service',
    data: {
      description: 'If you’re having issues with your batteries, chargers, switches, fuses, shore power, or electronics, we’re here for you.',
      secondaryDescription: 'Please provide a short description of your electrical issue and one of our marine professionals will be in touch to arrange your service.',
      textAreaLabel: 'What can we do to help you?',
      buttonText: 'Request'
    }
  },
  request_price: {
    templateName: 'Request Price',
    templateTitle: 'Trash Pick-Up',
    data: {
      cost: '10.00',
      unit: 'bag',
      description: 'Our helpful staff will be happy to arrange pick up of regulated trash from your yacht at a time that is convenient for you.',
      secondaryDescription: 'Please let us know how many bags of trash you need removed, and we will be in touch to schedule your service.',
      textAreaLabel: 'How many bags?',
      buttonText: 'Submit'
    }
  },
  request_list: {
    templateName: 'Request List',
    templateTitle: 'Electrical Service',
    data: {
      description: 'If you’re having issues with your batteries, chargers, switches, fuses, shore power, or electronics, we’re here for you.',
      listDescription: 'List Heading',
      listItems: [
        'Line Item 1',
        'Line Item 2',
        'Line Item 3',
      ],
      textAreaLabel: 'What can we do to help you?',
      buttonText: 'Request'
    }
  },
  request_price_list: {
    templateName: 'Request Price List',
    data: {
      cost: '4.00',
      unit: 'ft',
      description: 'Prevention is a lot cheaper than a cure. Keeping your boat properly cleaned will help you avoid costly compounding and wet sanding to restore your boat’s gel coat down the road. The best way to preserve your boat’s looks and shine is by washing it at least twice a month.',
      listDescription: 'List Heading',
      listItems: [
        'Line Item 1',
        'Line Item 2',
        'Line Item 3',
      ],
      textAreaLabel: 'What can we do to help you?',
      buttonText: 'Request'
    }
  },
  book_price: {
    templateName: 'Book Price',
    templateTitle: 'Boat Wash',
    data: {
      cost: '4.00',
      unit: 'ft',
      subtitle: 'Boat Wash',
      description: 'Prevention is a lot cheaper than a cure. Keeping your boat properly cleaned will help you avoid costly compounding and wet sanding to restore your boat’s gel coat down the road.',
      secondaryDescription: 'The best way to preserve your boat’s looks and shine is by washing it at least twice a month.',
      buttonText: 'Schedule'
    }
  },
  book_price_list: {
    templateName: 'Book Price List',
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
        'Around All Hatches',
      ],
      buttonText: 'Schedule'
    }
  },
  book: {
    templateName: 'Book',
    templateTitle: 'Boat Wash',
    data: {
      subtitle: 'Boat Wash',
      description: 'Prevention is a lot cheaper than a cure. Keeping your boat properly cleaned will help you avoid costly compounding and wet sanding to restore your boat’s gel coat down the road.',
      secondaryDescription: 'The best way to preserve your boat’s looks and shine is by washing it at least twice a month.',
      buttonText: 'Schedule'
    }
  },
  book_list: {
    templateName: 'Book List',
    templateTitle: 'Boat Wash',
    data: {
      subtitle: 'Boat Wash',
      description: 'Prevention is a lot cheaper than a cure. Keeping your boat properly cleaned will help you avoid costly compounding and wet sanding to restore your boat’s gel coat down the road. The best way to preserve your boat’s looks and shine is by washing it at least twice a month.',
      listDescription: 'Our Crew throughly washes and dries:',
      listItems: [
        'Topside',
        'Glass',
        'Stainless',
        'Outboard Motors or Drives',
        'Around All Hatches',
      ],
      buttonText: 'Schedule'
    }
  },
  pumpout: {
    templateName: 'Pump Out',
    templateTitle: 'Pump Out',
    data: {
      cost: '4.00',
      unit: 'gallon',
      subtitle: 'Pump-Out',
      description: 'Our helpful staff is available upon request to provide marine pump-out services at your slip.',
      secondaryDescription: 'Does your holding tank require a special fitting for pump-outs?',
      inputLabel: 'Special  Fittings',
      textAreaLabel: 'What can we do to help you?',
      buttonText: 'Schedule'
    }
  },
  get_help: {
    templateName: 'Get Help',
    templateTitle: 'On-Water Help',
    data: {
      subtitle: 'Need Help\nOn The Water?',
      description: 'This button is fo non-emergency assistance only, including boat towing, fuel drops, jump starts and ungrounding. If you have an emergency situation, please call the Coast Guard or dial 911 immediately.'
    }
  },
  fuel: {
    templateName: 'Fuel',
    templateTitle: 'Fuel',
    data: {
      cost: '3.50',
      unit: 'gal',
      buttonText: 'schedule',
      description: 'Our fuel prices include all taxes and fees.',
      secondaryDescription: 'Fuel prices fluctuate daily. If there is a change in price, a confirmation will be sent on the day of delivery with a final price for your approval. Your credit card will not be charged until your delivery is completed.'
    }
  },
  captains: {
    templateName: 'Captain Services',
    templateTitle: 'Captain Services',
    data: {
      cost: '50.00',
      unit: 'hr',
      subtitle: 'Captain Services',
      description: 'Want to have a cocktail or two out on the water without worrying about driving the boat back to the dock? Looking for someone to deliver your boat to another location? Our licensed captains are available for all of your boating needs.',
      listDescription: 'What You get:',
      listItems: [
        'Licensed',
        'Experienced',
        'Knowledge of local waters',
      ],
      requiredText: '4 hour minimum',
      buttonText: 'Schedule'
    }
  }
};

export default templatesInfo;