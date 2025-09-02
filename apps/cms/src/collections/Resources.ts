import { CollectionConfig } from 'payload';

export const Resources: CollectionConfig = {
  slug: 'resources',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'status', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Whitepaper', value: 'whitepaper' },
        { label: 'Guide', value: 'guide' },
        { label: 'Template', value: 'template' },
        { label: 'Ebook', value: 'ebook' },
        { label: 'Webinar', value: 'webinar' },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'gated',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Require form submission to download',
      },
    },
  ],
};
