/**
 * @domain Entity
 * Representa un proyecto arquitectónico.
 */
export class Project {
  constructor({ id, title, description, category, coverImage, images, year, location }) {
    this.id          = id;
    this.title       = title;
    this.description = description;
    this.category    = category;
    this.coverImage  = coverImage;
    this.images      = images ?? [];
    this.year        = year;
    this.location    = location;
  }

  isValid() {
    return Boolean(this.id && this.title && this.category);
  }
}

export const Category = Object.freeze({
  RESIDENCIAL:  'residencial',
  COMERCIAL:    'comercial',
  INDUSTRIAL:   'industrial',
  INTERIORISMO: 'interiorismo',
});