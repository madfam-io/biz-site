import { CollectionConfig } from 'payload/types';

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'status', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
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
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'AI Platform', value: 'ai-platform' },
        { label: 'Automation Tool', value: 'automation' },
        { label: 'Creative Suite', value: 'creative' },
        { label: '3D Assets', value: '3d-assets' },
        { label: 'Innovation Lab', value: 'innovation' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'development',
      options: [
        { label: 'Development', value: 'development' },
        { label: 'Beta', value: 'beta' },
        { label: 'Live', value: 'live' },
        { label: 'Deprecated', value: 'deprecated' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'features',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'showcase',
      type: 'group',
      fields: [
        {
          name: 'images',
          type: 'array',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'caption',
              type: 'text',
              localized: true,
            },
          ],
        },
        {
          name: 'video',
          type: 'text',
          admin: {
            description: 'YouTube or Vimeo URL',
          },
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
      ],
    },
  ],
};