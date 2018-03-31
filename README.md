# Named Avatar Generator

Generate default avatars based on user's name without a sweat

## How to use :question:

1.  Install the library

```sh
npm install named-avatar-generator --save
```

2.  Start creating avatars

```javascript
const AvatarGenerator = require("named-avatar-generator");

AvatarGenerator.generate({ name: "Ameer Jhan", size: 64 }).then(avatar => {
  AvatarGenerator.writeAvatar(avatar, "./default-avatar.jpg");
});
```

The above code will generate an awesome default avatar as shown below

![Default Avatar](./src/images/default-avatar.jpg)

## Available options

```javascript
AvatarGenerator.generate(options).then(avatar => {
  ...
});
```

| Option  | Description                    | Default                  |
| ------- | ------------------------------ | ------------------------ |
| name    | Full name of the user          | No default value         |
| size    | Size of the avatar in pixels   | 40                       |
| bgColor | Background color of the avatar | A random beautiful color |
| font    | BM font path                   | Sans with best font size |

## Utility Functions

### Write avatar

This can be used to write the image to the filesystem

```javascript
AvatarGenerator.writeAvatar(avatar, path)
  .then(() => {
    console.log(`Image written to ${path}`);
  })
  .catch(err => {
    console.log(err);
  });
```

### Get image as Data URI

This can be used to get the image as **data URI**

```javascript
AvatarGenerator.getBase64(avatar, mime)
  .then(dataURI => {
    console.log(dataURI);
  })
  .catch(err => {
    console.log(err);
  });
```

### Get image as buffer

This can be used to get the image as buffer

```javascript
AvatarGenerator.getBuffer(avatar, mime)
  .then(buffer => {
    console.log(buffer);
  })
  .catch(err => {
    console.log(err);
  });
```

### Available MIME

The supported **MIME** are

* jpeg
* png
* bmp

## License

MIT © [Ameer Jhan](mailto:ameerjhanprof@gmail.com)
