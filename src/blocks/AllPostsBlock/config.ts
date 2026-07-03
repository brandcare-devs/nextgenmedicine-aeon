import type { Block } from 'payload'

export const AllPostsBlock: Block = {
  slug: 'allPostsBlock',
  interfaceName: 'AllPostsBlockType',
  labels: {
    singular: 'All Posts Grid',
    plural: 'All Posts Grids',
  },
  fields: [
    {
      name: 'perPage',
      type: 'number',
      defaultValue: 6,
      min: 3,
      max: 24,
      admin: {
        description: 'Number of posts per page (default 6)',
        step: 3,
      },
    },
  ],
}
