import { CollectionConfig } from 'payload/types';

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'tier', 'status', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'tier',
      type: 'select',
      required: true,
      options: [
        { label: 'L1 - Essentials', value: 'L1' },
        { label: 'L2 - Advanced', value: 'L2' },
        { label: 'L3 - Consulting', value: 'L3' },
        { label: 'L4 - Platforms', value: 'L4' },
        { label: 'L5 - Strategic', value: 'L5' },
      ],
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'headline',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'subheadline',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'features',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'icon',
          type: 'text',
        },
      ],
    },
    {
      name: 'pricing',
      type: 'group',
      fields: [
        {
          name: 'startingPrice',
          type: 'number',
          required: true,
        },
        {
          name: 'currency',
          type: 'select',
          required: true,
          defaultValue: 'MXN',
          options: [
            { label: 'MXN', value: 'MXN' },
            { label: 'USD', value: 'USD' },
          ],
        },
        {
          name: 'billingType',
          type: 'select',
          options: [
            { label: 'One-time', value: 'one-time' },
            { label: 'Monthly', value: 'monthly' },
            { label: 'Project-based', value: 'project' },
            { label: 'Custom', value: 'custom' },
          ],
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          required: true,
        },
        {
          name: 'type',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Ghost', value: 'ghost' },
          ],
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'keywords',
          type: 'text',
          localized: true,
        },
      ],
    },
  ],
};