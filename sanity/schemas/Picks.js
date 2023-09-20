import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'toppicks',
  title: 'TopPicks',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    // defineField({
    //   name: 'slug',
    //   title: 'Slug',
    //   type: 'slug',
    //   options: {
    //     source: 'title',
    //     maxLength: 96,
    //   },
    //   validation: Rule=> Rule.required(),
    // }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
        name: 'post',
        title: 'Post',
        type: 'array',
        // to: {type : 'post'}
        of: [{type: 'reference', to: {type: 'post'}}],
      }),
  ],
})
