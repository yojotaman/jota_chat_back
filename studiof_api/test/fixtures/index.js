export default {
  getImage () {
    return {
      id: '6a238b19-3ee3-4d5c-acb5-944a3c1fb407', // puede ser generado con el modulo uuid o se puede usar cualquier valor
      publicId: '3ehqEZvwZByc6hjzgEZU5p', // codificacion base 62 del id anterior
      userId: 'Luisa G',
      liked: false,
      likes: 0,
      src: 'http://studiof.test/3ehqEZvwZByc6hjzgEZU5p.jpg',
      description: '#awesome',
      tags: [ 'awesome' ],
      createdAt: new Date().toString()
    }
  },
  getImages () {
    return [
      this.getImage(),
      this.getImage(),
      this.getImage()
    ]
  },
  getImagesByTag () {
    return [
      this.getImage(),
      this.getImage()
    ]
  },
  getUser () {
    return {
      id: 'f632db90-d6bf-46f0-9fb1-4eb6912cbdb4', // generado con el módulo de uuid
      name: 'Ricardo Buitrago', // usuario de prueba
      username: 'w_martinez',
      email: 'w_martinez@studiof.test',
      password: 'p4ssw0rd',
      createdAt: new Date().toString()
    }
  }
}
