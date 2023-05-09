import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import {
  conversationObj,
  onlinePersonData,
  trendingObj,
} from 'src/app/interface';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-user-community',
  templateUrl: './user-community.component.html',
  styleUrls: ['./user-community.component.scss'],
  providers: [MessageService],
})
export class UserCommunityComponent {
  like: string = 'thumb_up';
  fill_color: string = 'black';
  displayConvesation!: boolean;
  displayDoubtImg!: boolean;
  localImgUrl: string[] = [];
  doubtImg: string = '';
  progresSpinner: boolean = true;
  showData: boolean = false;

  conversationObj: {
    question: string;
    description: string;
    img: string[];
    name: string;
  } = {
    description: '',
    img: [],
    name: '',
    question: '',
  };

  showOnlinePerson: onlinePersonData = {
    field: '',
    img: '',
    name: '',
    likeCount: 0,
  };

  featuredData = [
    {
      head: 'I would Love to take Admission in LMS',
      message:
        'It provides a good environment to learn and give great assignments to work on.',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbpdlfsyBLz7nSCkx0-gLvGtgQzW6peyJWtOp8AuFt-7TXpoRQ-XgkVIhvpfLC3Gq4kcY&usqp=CAU',
      name: 'Rossi cristina',
      id: 201,
    },
    {
      head: 'Do not need attention from.',
      message:
        'Always focussing their students growth. Such a wonderfull experience in LMS.',
      img: 'https://qph.cf2.quoracdn.net/main-qimg-4aa93ebe1b36c01c529863ad32aa8187-lq',
      name: 'Jessica ',
      id: 202,
    },
    {
      head: 'I would Love to take Admission in LMS',
      message:
        'It provides a good environment to learn and give great assignments to work on.',
      img: 'data:image/jpeg;base64,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',
      name: 'Jenni Bheem',
      id: 203,
    },
  ];

  trendingData = [
    {
      question: 'Am getting Following Errors ?',
      description:
        'While importing Some module am getting Module built error. I attached follwing image to better understand. Please help me to fix this?  . ',
      img: [
        'https://www.researchgate.net/publication/287163792/figure/fig1/AS:399031084830722@1472147832415/This-is-a-sample-to-show-the-questions-and-answers-on-Stack-Overflow-site-lect-questions.png',
      ],
      name: 'Jessica ',
    },
    {
      question: 'How this community will help you ? ',
      description: `During the time of class you may or may not get some doubt. Sometimes your doubt would
        come after some days, then in that case you can post your questions or doubts in this community. You
        will definetly get help from tutors or someone, who know about it better. So do not hesitate to ask
        any question or doubt. `,
      img: [
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUSExMWFhUXGBcYGRcYGB0aHRoXFxgaGB4ZFxgfHSgiGBolGxgYITEiJSorLi4uHR8zODMsNygtLisBCgoKDg0OGhAQGy8lICUtLS0rLy0tLS0tMC8tLS0vLS0tLS0tLS8tLS0tLS0vLS0tLy0tLS8tLS0tLS0tLy0tLf/AABEIALMBGgMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAwQFBgcCAQj/xAA/EAABAgQDBQYEBAUDBAMAAAABAhEAAyExBBJBBSJRYXEGEzKBkaFCscHwFCNS0QdikuHxM3KCFUOislPC8v/EABsBAAEFAQEAAAAAAAAAAAAAAAABAgMEBQYH/8QANhEAAQMCAwUHBAIABwEAAAAAAQACEQMEEiExBUFRYYETcZGhsdHwIjLB4RTxFTNCUpKi0iP/2gAMAwEAAhEDEQA/ANxiu4ntTIRPEl9WJFgTz9ImsWgqQpIOUkFjwPGMxkbGVKnFE8MCCxuCTqIuWlGnUxYz0/PRZe0rutQDOzGpzJ05DlK0qdiikkZCQLHjSvRuce/iFb24aJcHQnhxhrsXFkoCV+IUfi2sSsV3twGCFepv7RuNp1TL8Sqv5ZpbnR/K2urCD8UqjoVUt8/oP8XL2CGyOCfhdx8gmsqeokOkh3vyAPDn7Q6gghCnAQiCCCESoggggQiCCCBCIIIIEIggggQiEps1KQVKIAFySwHnHS1AAklgKk8oyztf2kE4rQFKEtIOVI+Kl+OYuGsz9TFi3tzWdrAGp+b1Rvr5tqyYlx0HH9Df0Cte0O28hDhCVzG5ZR/UdPKGcj+IKFKyqw6063q3FstozZajlI7xf+meNHRldgelP1Vh4uUFkqJYqEo6/wDbXnAZwd72jWbY0IjD5+xhc3U2veYgcQA4Boj/ALAnzWv7K25In0lr3mcpNCPKJWMTlYtQUnIogvRRKGBAejV0jUezG2BiJdfGhgr6Hzijd2XZDGwyPRbGzNrfyT2dUQ7dGh9jy6qbgghjtbE91JmTBdIcdbD3jOc4NBJ3LZc4NBJ3KD7T9qhIdEsBUwUrYG7MKq8rRUz2oxpc96ryQ1+QReISfOCiTndyCak3ANai9FUrU8XgQgWfMKqZhpkPIWULaHhSOSr31eqcWItG4CR7T3+ELm6t3VqGSSOQkR6efSFcNj9tZicqcQMyTQrCSCOZGUBvIedovcmYlSQpJBSQCCLEGoIjFUORuksEgFiHDh3cqGhfoR1jROwOO7ySqXX8si/8wdrn7MaOzL6o5/Y1DOsE65bueXXJXbC7eX9m8zw493h6K2QQQRurYRBBBAhEEEECEQyx+DTNRlUKguOR/wAUh7BCgkGQmuaHNLXaFVr8MqWykVAunXy96dWu0SmBxwWKF+XPh15Q5mIHkft4jcTgyDmQcqvY/wC76H+0WcYqZO14+6oCk+gZZmN49vbw5zCVPaOoi8JjXLKGVYuDr04xIoW8QPYWmCrlOq14kfPbuXcEEEMUqIIIIEIgjyPYEIggggQiCCCBCIIIIEKB7YYlSMLMKblk05mvsDGXrWoMWNv0j0f0jTO3SVfg5iks6WNbefKsZQgrJWSAXBKWAJPgCHy/8n+GzGNzZ0CjlxPouQ29Jumg6YR5k/Oi6TiHJ3Tm70SwCshLmQiZv7u7uk/D4qQSMQJhSoDKlcsLBNXJGdgACkkDTM9zlIrHowzKVnloyqWt8iHcAgpKxqLm2bNAnMMqsv5ndoBJADl94OmoBAOXS0X896xW8vnn8HfkqtJBevmcvsEK4+0WTsHiynEhCj48wuTZJP6E6iK1JCq5q1Yf6lq110yUp8UWHsFhM2JlrKSFJSsqcHUEU0uRq8RXEdi+dIPp7q1YYv5VPDribpwnPy1WoxGbfwffYebKZ86bcTdvaE8ft+RKLFQJ4Aj5kt6RHL7YywWKGHHOB845Z+FwLTvyXdPewgtJ1WbdwmgDjKQQbPlAHGtG9IJkoVyijECqg9E9W8A9BFo2vs6TiVmZhlJKzUy1ZakuxSrmRqRW3CIhWw8QDlMmZ0AV83L2uI5GraVqT4IJ4EZg/OG5c4+jUYYOfMaH5w3acyySCE0AAs1dAE18gzHgIvfYhAkyFTJhCQsgAu9EPbU0LeUQuB7NLSO+xDolgVCjmUa0ABOvO13hfE4orISAMoGXKFMEJ0AF7a6xt7D2VVfU7aoIaNOJJ5chOvFbOxdlVK1Ttn/S0csyTwHCPVTmK7XS7S8vVR/+o/eGK+1q3vLbiMrO7NVTu8VmSVZgkyg2cpzb3+mVTQNL7iOW+Osd4bFLPd5pZQ6iClirdCVEEkpBBzAevOOubQpAfb5SuuZbUWiMI6ifMq0y+2DEZghQ4pUA3E1VVmNosOz9qypyXQqvA3/v5RncwpegI0IGr1t6mnOF5eICGUmhcfHbgamG1LSm7TIplWxpP0yK02CITs5tkYhFWExLZg4toaEiJuMt7Cw4SsZ7HMcWu1RBBBDUxckQitDjmIcGE1cYUFNIBUfisKFp1B0IuDCEjFqSckwsr4V/Cr9okpiWL6H5w2xWHCwUkOeHy6dYnY8EQ7T0VSpTIOJmvke/8Hd3ZLuWZhIGYXc0uKfV7QoO8c+EitD7BxbTjELLxi5SskyqdFVp1/tEtJxT3rwPHztCVKJbnuS0blr8jkRqEq82vhPD7f794Hmfy8vbn1/vDLaeJUhHeJVXhcN96xXMT2hmKcCnMadIrOOFTOqhuqmsNtkKxU2SCGSEhPB2ObrUj0MSaBMpvA9Q2lzTX6xmSZWVWa8WrATlZMyFFxf53aojKo3dWS2q06k5Hy4GO/RUaN1UMio3edD5dPRWdKJlXULUYa19rekc5Jld4cqO1/XQQx2PjVzXKqAUAapOpJt5NEzGjTc2o0OEwr7CHtkSmmSbTeHp1+/8VVlJWPEQae8LQRIGgf2nhqIIIIcnJGfKC0qSoOFAgjkYyjtBspWGmZFE5SWSf1P7P8j767DXG4OXOTkmJCh8jxB0MW7S6NB2YkHX3+arN2ls8XbBBhw0O7uPvuPgsTWoaBemtA3/AOI9YkD/AFGPDM7gHXNzNOUXTbPY+SVbuKQhnGVZGvFzW3DjxMNMP2AE0v8AiUkOS6GXf0+7vSNUX1udHesrnXbHvWj/ACz35EeJICrkvD5zSXUmucFy/Q1MXDDpOHQZZLTFgGYeA0SD8+dOtj2bsOThklYBUpIfMamg0Gnzioz8TmJzCYC+YnKb9Wa8Zt/fCo3s6em/mtCz2Y62IqVTLtwGeEb8+JGXISM5lM14dWZwSQVWyeFNaBxd8oetM3KPJcmY6XbS/FK5Z4E2SqtHezAQ4SkkhwouKkhSbBndyEltGDx6qWigobO4USeitYyVoylJ00oJJG7Wzm3lcvxiz9mtqlX5ay98quLaPrb7pFQzISt6cfEkeymL+esPpOJ3kqQsUIVQguxEKDhzSsfgOIKU7W411iVXKkB7NmV1NaEesV5comrzPItytmjrtdOaY+ZlnESwkBTEp/EISrdfeGR9C14jVSsUZiyAUDLMy77pK0rR3XxFgpIU4CUtmIOahjoqbQxgaF2tJoZTawDcE8nGrZi4/nPVzTrHU2aoeFY5uPe0MJ34hQllIVmJKyyxu5lgiWoCYElkUfeBILXrzOXNSZwzKqQU5lpCinvKolpzlIOTMEqZHwu5cw/En4lIzEg1CGUS+ZKUmtquz0jyTLIKgBR9AlJBAeuU6u/nCCCCuWM6koCVHKqbUqzpy5iFkqpmo5DFjozWdNmDvRlmgKxEnLUAqQe6SoJVm3XUF0LUNGpCzvS4t6seyMUqXMSplUNavu2NzwL+UaFGPyZEwTJK5meiJqSO8bKFTEGX3gzsshAIJGZzxjWNnKeVLPFCT/4iKd1S7Qgj58lZ99S7TCRl8B5cU4gggjMWQvDARBAowISYsQfvnCeo42hRbDX3hOYoXcff20EphaU0x+DzgxAzCuUauP24j5f4aLJNnpCSpRAA1JYecVvae15agcm8Rbg/F9fLpFmncBgh2iz7q3BOJuTk02ltLOlqv8/vyiKSI4XMUoudePrbSkeoW8Var6dQyzJMo060w7NdkQth8WUhhrCCzCbxo29GmWQQCurs7RraQa8TKvPZ6aCjrXo5MPZswZmzKSbBtSzilf1PUaRStm7VVLt7RZ8BtwL/AO3NPRJI9RELrU0/tGSgqWZpmWjJPkzEu+dRF9WahFdQ1acYEKQ4OdRYOBvHQ1PEs8LJnv8AAv0A+ZhVFvC3Kn0MQkxr+FWJjX1C7Spw4jqCCI1EkMTiEy0KWsslIcmM9272lmTXSlXdp+EDXQFZF+lvnEj/ABBxpOSQA4otVrvR3IsxPmIpsxkgEDS6QPoeEc7tS9cXmiwwBrzPDu3Quh2ZZtawVniSdOQ9zrKSqCXCXenhs9X1NIWw01SFOSAQ2VSSEkUrV6F2FISQsBiUk8dfmqhhQpcHeBc2ZIZxbr+0Ysx89FqiVc9idolrSZM8jeSUomA6kMAqgp/N68YiVS1IIYv1KvqtniuJXlPi8IrSpIGnXrwizrk97JRO8SXKVEE0UCCXY6gJPmY6DZ12+pNN5kgSDy4enQ8lzG3LJrQKzBA0cPzyGRnpxUWVzlkgqUEd4oOyKBE4pGShJGQEHMDo2sGz1TczrSN0pC3EtKQe5lqcEDNn7xRP6WJ5Q/n5yrdFOalJ00Y184SK5ngKOLeNQupnOooip4mNRc8ClVykqJLJzc2X1AqK01NGgkJKpgQkpzE5QGTQE2YL4mrCOJOGUmY4CeJJNTVQoH/SdeMWjs3sre74gsPC5NTZ6moH3aFAnJK1mI4VE7dkFE+YczBya1G9X6xFqmCjLU1yQQzOXuHA/aLj2nwRIE1ItRXTQ+X15RUsazZlAkJBNK+wBPpHRUH46YI7vnquztqgqUg4dx6fJ6rnuwE7p6l8v/qNOkeyyatlNncnyuOLw0m4rDobMfhfwEpbIpbOEM+RKi12alRBj8XKC2K0pKC1UqJB3FqLigSy5ZKmYPcRJIClkDNPpktZy2opyASHDcW46WMMkFVPzUuAq6ybihIYOXathUAax7h1pSClCgkZggnu1tnBKGCipvEGoeHGOpKR40OpKqjxEZSGHlBqiZ/tKYfDKK2E3M7HLfgABU00rx41jT5CMqUp4AD0DRVezez80zvCN1GvFWg8r+kW6M+9qfUGt3LL2hVh4Y06a9U0myllTheUNZnqxqa8SOrQGQpmznxO/Jmah41+kO45KgIzsIWdiKaHDrYDvT1YVu/09Dxp5+HmV/MLUanOv38hSIjaXa7DyypCXWoON0UfrYxUl9osQtRVnIuyRYcm1jNuNoW9ExM9x081o0LC4qidO8fpWjbPaKTg1ATUrWVCjBJFAAfi1NWYfKK7iu2k9biShMtJ1IdTdNOjGIvErVMOZRzK4qr6cBUwymS1Auuo+UNpbR7WRTEd/wCvyVRvbCtSINR5wn/aNO92v/Fpz3708mY9SjmWsk8S5+fHhBKnZqlVBx/aPZODzMond1EO14kEZU2DafKAY3H6zJ4DQeSgLWMBwNgcTOI+ei4JcO9/v76wYYR13dAOAcnrX6COZRY+ftE93W7CmI3qvRcXvTgppHmSOs0PMBh8/wC/9oksb7GAAc10VvXAaJUcVlJqDElgVSlORNUhYBISQxLCyeJ4QvPwJA4NbW3lDeTLKtxSGa5LWbpGqbmpEAq9ia5kgx3H8HVWmTO7sAFSlhgSUkG+blVNL8xDs49nGSYW4gVYsW4xUVy5soZpM4hvhCnHp4fKkTWxtp4mYkFcpLcQ4J08NaxVJJOZWVXtS0YwQR4Hw9lJI2iCwCV1fQXFGJeh5edod4eaFAKAId78i0KIU4eOoQSqBjgs07bLCcVMKhQpR5jKAzdYqaMLmKHLAJKcoBBYhaSymFN4f0iNE7e7LzZJ4fdGVTAFq7pqDxI8xFIyqZwDw0BPM7oakcjfsNO4eDvM9DPzoups3CpQYeAjwTLuwFpKpgJS72BKjmKqu4BKny1bKOcOVKSWqlNKAudWdwq0KsclCVFx+rk9RVmc9Y47xaeDniToBZ+b+UU8RcrQELoTECoLagkkvQ2rW8aJ2IQ+GUFC8w0NfhTGeyitakhnL+FBrWg16aRrGxsH3MlCNQHP+41PvSNXY1MmuX7gI8SI9Fm7WqgUMG8n019lG4vsvLJzS2SXdiHr1v8AOITaezhKpNnpepAzbzdAkD+qLB2i2x3CQlL51cASw4sByp9g0KdPWoqUcyjVnQXJPVL+fLnFvaO0m0HdnTALt86D98so3rmP47DmpDCbQlS/+3nAsStIBrZhfzMTmG7aJoFSsqeIWktyb7tFMky1lQdCWuosQHoCAD/y9rC4qWrMwQMrj4FEsHfg/I/OMf8Axa6Dvv8AJsen7UrabW6BahgNqScQncUDd0m/A014UiA2/sCZlUZDFwaEElL8ACCoe/ziq4bETEZCCUkAOcigxYWIpflGh7B2p3yWV4035jiPrHQbK22XvwOyd5OjzB/Gino1n0TLeqz3F7IQcpLsnxJdgsd0uVUOACy78hybiXg5ROeqVAklSlBRLhCT8RDHu0f09Y1HE4GVM8aEk8dfUVinbX2pgpRKUIM1QLFlkJHLNUnyBHOOmbe094PkfyFq29yKxhrDO/SPEkR1UJiMIFSlSUrSMxUSQagrUVkpruqBJIOhD6RYNk7BWtiSpEschbgkM7c/nEVh+1mUujDSeT5yryJS/pFm2R2ukzWSsGWo6q8P9TBvP1iOpe/7BHP9KS5Fwxs02dZBI6T55hWDDyUoSEpDAWELQQRQXPTOZTbFzVJSSlCln9IIHuSIhp2CnTge+XlST/py6Bj+tZqeBYCLFHCkxDVpCpqTHDd+/RTUqpp6ATx39OHfqqtiezstGUpQCxszu/W/neJOTgZUxAGRJDMaRJlgwLVp5/vDXusiipNviSPmBx1I1+ddttTpklrRB1Cndc1KghzjI0Kgcf2XbelUPC4/eIadJ+BSAFvqI0KWsKDgg8wXhtjMJLmBlpSeoqH1fSGP2e0HFSy9P10Qb0vbhqifX9rNMSspUAzpHztaHeDCKh3LPXgatTmIkdt7BKAcu+gi1lDzsYqqMSZaiLmgAOruz8Db0hbTEHYKog7vdZV6Cx2NhJB15csoyjTqpmczEikMekOEklAKr3bzMN1xnbZrEVA1ugUlqSG6rtKrRZtkIVkdLHkX+giryQ6gOYjQ8EnKhKcrWB5daXd6e9REexWl1R7uQ81dZUInKUymJnsfyArotrRDYqRigpxIOtgC3Ri4i6SlCgykO9xwLe8IoxL3lqdhYOK0FaE1LWp0rHShWad4WTDAfH/0onZ+zZiQFzN7+Tg2rfEfblExgJUsZjLADly2pZnI40g/HBnKF3Gg1a9aVMMppWF95KCrspCgAFO9i7pVQ8RWrO8LAKrVHVKhJdl4QpuCEZE4LDjzBoQeBGhhaEVZJTZYUClQBBDEHUGKJt7shNSc+HJWl3yEsRy/mHv840CCK1zaU7gQ8aaHePnBWba6qW5lm/UbvnP8SsbxGBmS/FLKdGKFk3ccKeULYTZM5bZUgCtVIKR6qIAo3pGjbc2mZQyo8ZD9B8n6xVJk0rJOZRUznMlR0a9NHjBq2FOm/DiJ6AR3nP0Wu3aTnNnAB1Ppl6qd7ObBlSj3hKVzW+FiEjlxNb/Zs0ZxJXMCkkqAD0bMD4efNvU1oItGz9pKWhUtZGfKopPEAfMRrWdemwCmGx1me+d/isq57So41HGfwqjtnaOdcyYQSN46gsBQCjWarxCSVICqIWSkpGnizAMSWDgrFjUUDgQ+EurqLdSdf+TaW5Q3El8xKSQQzsVOC1PFUVPvHHdpiJc7U5nr8PioEricGkqdmoQpRDggpIrUesc4mSkkF5ZIcPmKSHAsA7UrRrCkBVMFsxSbBtH13SQD1tHcuWS4ILtqkAO5feavCmgeEkiJKF4WS4CpaQDmYTGqasqlrevSJTs7iFS56F5gQVZVbxIyqGlLuxaImbKXV1h3DBkF7By6eRPrZoWwfeAjdVp+gOVECydQ3uYdTqGm9tQagg68Cgqz9t9tlDSEFiQ66scpdk+bF+TcTFDnEGl3NiX9BmpEn2wnZsSsqDtNYC+Yp3QGbgH5MDpEPPxDFZJbKMxG9QddTQ2Aj0M6rq7Sk2jQa3kCe8iT4adEpKlpBqGaz0tTjHCRq6AX4P616+kACiWcF2uVV5s9A3KFxKLUZ6vQ35PCK0BwV77CbYVMR3MwuQnMg/y/p8nDcukXCMm7GTiMXKqHJIo40rTpGswi5jatJrK8t/1Ceu/x1RHGcBgSHNucdwlNkhV/n0PzAgWaucRJSsMoPX3t9YRGFQFZmLu5rc8/V+oEdfgUMzaNfg37COJ2CS4IBJBBvwL+sNeBqlaTokxh5YL3TY1fKR8hT70WVgpZo1euhhI4cO5SdauaO505kxynDIFPhVYg2fT9vSI2lnwfMk44kpMwCGoG1d7eZ0jOu0mAK1KyeJJo7bxrc05Rf8ahCAQEutVEjUmhpwFL6RWV7NmmaAqhWSTyH3aLVOkw5lU65c5uDx+bs1V04hQSAtwrn9OMKS5j3i3bVw0pEllJSbsCAa2r56xW09nZq0ZpZCQTR/txHP7Stm1awY3+ucpjC+mOOXX9p5htnrAEzLuggnkAamNEk2B5CMvwPaKdhSZWKlkoIKSb0s/OntFy7PY6RiUflzsyks7FizMCU3EXLKyFsDhMzH5T6N2yqcI14b1YobYpMxhkIB5248OIA0oTq0Bwx/WoeZ4vb2gThGzbynVcv8ovSeCsrjLPpVFq3FeVD/bnHWWcwcpfM5agysaVB1aAYYud9RcNe16jnX7tHcrDsXzKNGqen7QuI8EJES5tC6BXeb9LNwqfSwhfDBbb5D/y2heCHSlRBBBCJFQ+0WLHezMxsprG4YULgUBBiO7xIQCTR2cJJrwDhtIsHaWStC86Q6VVuzFq6eekQaQRqviGJbifhp584waoLajgeK0GEFohe4icGzOQ7EUZhuipIL+IWHyh1sbFJ76UxLqKQ1CCFPq3B4bom6KBr+pzpQ2cV0ib7P4bPMC2ZKam99AzeflCUQS9oHEeW9K8wDKre1dn93NUg5qE15XGlKH3MRuNmZEcRmSlICgkPMWEByBRIKnPJ6Fo0LtJsYT05kn8xIZgWdJ0Nb8POKLi8NXIotcEZCDW4J/cRkX1obatH+kn6e7h007lRCj8XjVpmS5IQllNmrMUHK3oruz8KJlyParzGlIZagphutlJ0JrWg52hAKA8IyhmACgG/wBoCg1yKB6+rlClAOxUHLVe7it+A9eUUyIiP79Uq4GHCkk2Yg1DPuhrGgq3rE32awq5k9OZikHPTQO4FquWEMMJhpkxYShJck0BHMP4ehcmL/sXZgkIYnMs1Ur6DkIv7MtHXFUOP2tMn1gc515dEhVC7d7OKMQpRJyTGXTQihYgOC7nzEQRJANXcNUi2hbK+ti8a1tvZUvEyjLX1B1B/biIzjavZ2bJotBKRZaUgpbqBu9C0douk2deNqsDCYcAB3xkI9tZk71Fy5alEl2NHcAuK0sDCZS4oSQW+Bvpz+zHZBT/ANtLcSR7xLbD7M4icp1IKUu5Wq1QzgfFTQU6QK/Uc2mJqGBvnL2/KkewGDUucZhBCZYOgqo7otyzGNIhhsnZ8uRLEqWGAqTqSbk84fwi5S9uf5FUuGmg7v2ZKIIIIFURBBCK5IKkqq6Xbz4whShLQ3nycwp6aHr+8JowbWUoUFi1m05gV+kR2IxJlLCVd6xqFB1AsaggV+9IiqOy+oIJa3OfIp5hpjKyqG/oTcgaA6whiRlnFZocrJ8nqX5mOVykzA2dTu4JckGvA09tIi8WiZMnJw5W7A55gDbtN1/1kX4BjqIjbVezIieBy8D78NYKKpYW4mnPh7JsJRxk6j9yigP6m4U4s54ecWhODSAwFBby/wAQls6WlJISyUp3QOWv/r7w8ChQP93h9OmGyTmTqoWMjM6qG27sFOIQUg5VU3rtxprEXszsVh5RlzsykLQ7qSrK6reh3qagtFtseRhOShK07wBAWo16lvnEoO5Mdb03PxkCfZLhYtmBPUPp+49Y9XNSLkCrVLV4dYbI2dLAAa2r1cs59hHowEvLlCWDuznUEHXgTDlN9SdvHmYcYaf9NlU3LWvo/wC9+nARyrZUou6XBZw5ZwXeBEnh5/pPgY9hCTh0ofKGdn8gw8+cLwJyIIjdubakYWWZs9YQmw1Kj+lKRVR6Rmu1f4vTSSMNhkgaKnEkkc0JICf6jDmsc7RNc8N1Wrz5KVpKVBwYgcT2bcuiYRyP1I/YRnWC/i/igr86RJWn+TOg+pKx7RonZbtjhccCJaimYA6pS2CgOI0UnmLOHaIq1q1/3hOp14yaUhi9lokIzzVlrBKXcnkdLXaIrEbQUoAPlluQEjMHYFT0Z6A1PrD/ALT4lKp2QqbIzBiakPprW3KIUoRZWYDiQRdqcXPtFm1tadES0Znx81VuK7qhgnJcS5poQom5PiDBLVBzFrjrXg0SOBxQWcuIZYsCDvgDXM7qHIxEYorTnUEDdJZWQ+EJNNK7qXUzCl9HEssDm0UsB01IznLTL4crVHzierSZVaWVACOBzUDXFplqsWK7JJWNyeQk18IU46uIr+3JWFwW7MmGdNZ+7DJAFDvE5soo/GvnE0du/hsAVvmWk5EPV1EOCWAtUkUs1IyXEzlrWpS1LUtRcqGpNSbxjf4TaNcf/mPOPCY8k292gaTQ2n9xE9wUxO7YYhmkKTJR+mWljy3iCT5lukI4btbjhvDEqpfMrN7EERDsosS4PCuhB+jRwcPzPOh/xF1rQ0QBAWKbiq4yXme8/haPsP8AiSxCMUAxYd4kMQ9HKbGvBuhjRsPPStIWhQUlQcEVBHKPnWWCNCzD9FYufYXtKuVnw5spC1SwSN2YlJNK2UzNxbiYCIWjY7Qe54pVDM5A5a8+XPx5Oe3PbRSZhkYXKnKSFzQBmKhQpQfhArW7ijNWjr2liCcxmzSq+YrUT/VmhsVHpr53qY4ABpRzU3/eOfqVnVDiK9Bp0GUhhA+evRXzsf28my1plYlRmSycveKfMjmVHxJ4uX10Y65HzSl/hF+R/aN12BjJn4XD7pP5MqpN9wVi9Z13EFrs4VC8tWkhzcp14KwwQQRorJRBBBAhEJrTY6j7MKQQIXKkvDaZKGdGnitzHC0OYY7UmFIzC+VbdctPciDVBXeBQcmYHxEqqOMdzZZIs/Q/u0KyUZUhI0AHoIRAncU6fKvuPeGuSEKOx+O7tLrCqa5TxFCbeb6Q52FixNllafCVqboC30hwkTNctWfhqC3F6GPEImAEAIT4my8WDH1d/KGAEOmcu78ymAEGU8ghn+b/AC+b2rdtbaQfm/yH6f2h+LknynkENpfeuM2VtWfnb2hzCgpQiEZ05KEqWoslIKlE6AByT5QtFZ/iNOKNm4kjVIT5LWlB9lGHASYSEwJWJdrtvTMdPVOW+W0tGiEPQMPiNydTyAAhEjlHq1Dr5CPPl0i7A0Cp57175e39ocbPxUyTMTNlqKFoIUki4P1FSCLEEi0NgQNPMCOkwIWvq2j+KTLxQWZYmISFIGZhMQplB8w1QoCxIIjmUlUsb7qdlKOUXTLSghRU7vld6Q3/AIW4D8RgpySWKJ5KDwzS5biosWB6xIYvZ8xG4oKd9SkbrMzlJdLcNYGkaDcmPafuOhUejDMxM12AoFBzlWVE0U75Rle/yhZEglWYzWAXZLkXByqL3zPfQgEboMJoWCobuuUOQQOPwVuVM+vOJvY2wlzFBWZaZbvqH0okjWsKYAkpACTAVT7YzFS5WGlByDnVUu53UgkuXO6r1iohJNSkjqgfMfONJ/itg8v4daQcoSpNNGYgeYKvSM6UkaMOIISTe5ioTJJWPfAtruB5egScwN8Icu27ZmP6ft4UOIsGIPFn5fV/KOSgtRXHTkOA+/n0lNnAtUNe3veEVU4YXFmL3toeEOsDiFIUld8rGg1Bev8AiEJawzPxsQB6Q72Rgu+nIlAVUpKOLOWJtRhWEKX6iYGu7xyTvtd2fXhJyg35ZJKFGyk6B67wFCPOxEQAWbMG4P8A2jZe1Pa/BpCpBQnEkeJNMgI0Ki+90BblFGG0dnZ8ytnltcuIX8nr0cRnv2VVJlkRzyXptO+kfWDPKM+eohRfZzYEzFzkoQmjgrXolOpPE8BqfON6w0oIQlCUslKQkDgEhgPSIfsrtDBzZWXChKAnxS8oSpJOqhr/ALnPWJ+J6Ft2IIOu9Z91cuquyEAfPnwogggidVEQRFrx04BR7g0O7W4LsWAJZhXUFqR7Pxs0BTSSSLVNeGnyfW1CRCk4IjpuKmBZSJZUMwANQwKQXJ1DkilmreOU46YT/oqAYGty7EdDUjrdhWBCkVGIXbOIZUhF881mbRKTN+SCmHKNoTCH7hXhepPAlvC70Atc8GJqe2u0CU7YwmHUDlCSpVLLmoUEjyb/AMusOaM01xhX1IpW8dRyC8dQ1ORBBBAhEEEECEQQQQIREZ2g2b+Jws6RYzJakgnRTbpPRTGJOCBC+VcXLWlWQgpUkkLBuCCxB5io6iEQFceHAcL04vG3dv8A+H/4lRxOFypnnxoNEzGDO/wranA0drxj+1NlYiQWxElcsgtvggO+irKHMExca4O0VNzS3VMysgirsK2uxf6e8EpRcObCtuFffyhfZ+DmTTklS1zFUpLSVfJ2i7YDsavCShisWkBZIEqRRW+xVmm1YhIBOR6lnNwW1KjabS525JulXbsL3Oz8CgT1hEyaTOUipUMwAS6QHG4lLvq8TkntNgZxyd4kvooMPcNGWzpylEqUolSg9SXOpJrU844SuwqHamaleZGrH0jBdtCo52IAfOaQXDhkBktrTgpQqJaP6R7Q5ih9g9tKznDTCGIJQHqCKlLGrNXyMd7c26qYooQoolgs6SQVdaW5cIkrbSpUqQqOmTlG+d/Qcf0Fo2dI3H2ZceSsPaXZSMVIXIJAV4kn9KhY9Lg8iYw7a+HmSliUtKkqSplJdjZWvC1daVrF2UpmLnkenJucOl4aVicsvEOaMmbR0vYF/EnkbPRop2u3qdR4bUbhnIGZHXIflN2nsB1RvaUnS5u4iJHnmNyy9YmETEldpdw4eYtIFGqySHp/8n8seqzkkyyQToXt3ZFaKrnyV+zf9ofw3xKT+WtMwaMch80mg9Yayv4fY5R3kS0j+ZSSPYExvSuU/iXAMYD+PbzVLAVmc56FDAglhnOYGldxuP1i0SZCsNITiDuKnAplaES2ZaxwcKCRyUo8DF47P/w8kSSJk4iaoWSzJHUXV5sOURv8WJRzyFfDlWODEFJ+RESUgC8ArW2ds4iqKlbdmB79yz9arinIOPoKB48A9XpvONOcExVUgc3s5pT6x4EljoSA3AFhyrV4vldEpHZG0F4eaJqDvINhYp1SrkaiNzwmJTMQiYnwrSlQ6KDj2MYAqWX8RHGsbTsPCLGGkAuCJUsEPqECIK7A6FFVaDEqdgggiiqyIIIIEIggggQiGE7ZUlS+8UgZ2bNrZr3h/BAhcSkMAOAA9I7gggQiCCCBCIIIIEIggggQiCCCBCIIIIELwRTf4lBQky1CwKxxqpNPkYucMtqYFE+UqUuyhfUHQjmDEVZmOmWhMqNxtIWLzi+hOUEO7EuVANS7MfPlCctCaAilmpwKH0qUm5tQaRP7W7NYmSSnKpSbiYkZrcdUm19Rcwzwmx8TNJTLRMqSKpytutcU1dydPOMUtcDhIM9VmwQYhOOz5UZ7p0RMUTwTkUHsGvCkrEyy5Bbok6+TvWL32d2AmQhWdlLWGU1gn9I+v9orm1dnLlLykHKSWVUAjqBflT5RS2pbPZSZUIMZzymInI8NeOXBdJsX6GFh1JnyA+fpQ+HSQxLUo6lKNi2oZ6X5CFMKoVJCQrgFOGOp4VfSPJiQxANWNTW9iRUlomdhbKXOWFF+7SQSq2b+Xm/t6RkU6Tq7uzZmT88FsueKYxO0Cu+GJKEk3yh+rQvBBHocQuXKIhe1WxE4qQZdAsHMhRsFDjyIJB6vpE1BCgkGQlBgysAx2AmyJhRNQULGht/xNiOYhqtAsRXkB+/OPoDF4OXNGWYhKxwUkKHvDOR2dwiDmTh5QOhyAt0e0WxdCMwpxWHBZz2J7KLnqTNmIyyQQagjvG0SDdPE+Q5a3BBFepULzmoXvLkQQQRGmoggggQiCCCBCIIIIEIggggQiCCCBCIIIIEIggggQiCCCBCIIIIEIggggQiCCCBCITXKSoMoAjgQ4jyCDUwUhMJv/wBJkO/dp+npaHSUABgGEEENFNjPtAGugTi9zvuMruCCCHJEQQQQIRBBBAhEEEECF//Z',
      ],
      name: 'TeamLMS ',
    },
    {
      question: 'When I try to run npm install am getting Errors',
      description: `After clonning Github repo, I run npm install. But am getting Error. `,
      img: [
        'https://www.wikihow.com/images/thumb/6/60/Answer-a-Question-on-Stack-Overflow-Step-2-Version-3.jpg/v4-460px-Answer-a-Question-on-Stack-Overflow-Step-2-Version-3.jpg.webp',
      ],
      name: 'TemaLMS ',
    },
  ];

  unAnsweredData = [
    {
      head: 'My Story',
      message: 'I need to improve my proficiency in code and I will do that.',
      name: 'Roman Sangaria',
      artName: 'myStory of lIfe',
      id: 101,
    },
    {
      head: 'Question the ends.',
      message:
        'No one will answer untill you push them to answer. So be ready for it.',
      name: 'Mahesh',
      artName: 'needSpaceToAsk',
      id: 102,
    },
    {
      head: 'Can you ask?',
      message:
        'If a tutor is busy, One can answer that who knows well. So take a step towards your fear.',
      name: 'Nikolath fharid',
      artName: 'TakeMeThere.',
      id: 103,
    },
    {
      head: 'Do R&D for your self...',
      message: 'How can you depend on someone you do not know. ',
      name: 'Raghu Sisodial',
      artName: 'NeedR&D',
      id: 104,
    },
    {
      head: 'What is your rating in this course?',
      message:
        ' Before joining this course, I can give my self 4 on 10. But now Its 8 on 10. ',
      name: 'Sree Olivia',
      artName: 'sheThoughtsOnMe',
      id: 105,
    },
  ];

  conversationForm!: FormGroup;

  constructor(
    public fb: FormBuilder,
    public messageService: MessageService,
    public apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.conversationGroup();
    this.getCommunity();
  }
  public conversationGroup(): void {
    this.conversationForm = this.fb.group({
      question: new FormControl(''),
      description: new FormControl(''),
      image: new FormControl(''),
    });
  }

  GlobalCommunities: any;
  public getCommunity() {
    this.apiService.getCommunities().subscribe((res) => {
      this.progresSpinner = false;
      this.showData = true;
      console.log('COmmunities', res.data);
      this.GlobalCommunities = res.data;
    });
  }

  public likeFun(): void {
    if (this.like == 'thumb_up') {
      this.like = 'recommend';
      this.fill_color = 'red';
    } else {
      this.like = 'thumb_up';
      this.fill_color = 'black';
    }
  }
  public showConversationDialog(): void {
    this.displayConvesation = true;
  }
  public showDoubtImgDialog(image: string): void {
    this.doubtImg = image;
    this.displayDoubtImg = true;
  }
  public selectImg(event: any): void {
    for (let i = 0; i < event.target.files.length; i++) {
      if (event.target.files[i].type.match(/image\/*/) == null) {
        return;
      }
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[i]);
      reader.onload = (event: any) => {
        this.localImgUrl.push(event.target.result);
      };
    }
  }

  public questionSubmit(): void {
    this.conversationObj = {
      question: this.conversationForm.value.question,
      description: this.conversationForm.value.description,
      img: this.localImgUrl,
      name: '',
    };
    this.localImgUrl = [];
    this.trendingData.push(this.conversationObj);
    setTimeout(() => {
      this.displayConvesation = false;
    }, 50);
    this.conversationForm.reset();
  }

  public questionObj(trending: trendingObj): void {
    localStorage.setItem('questionDetails', JSON.stringify(trending));
  }

  public showOnlinePersonData(data: onlinePersonData): void {
    console.log(data);
    this.showOnlinePerson = data;
  }

  userCommunity: { image: string }[] = [];
  userCommunityImage!: { image: string };
  communityMsg: { severity: string; summary: string; detail: string }[] = [];
  public JoinCommunity(community: any) {
    const communityImage =
      community.attributes.community_profile_media.data.attributes.url;
    this.userCommunityImage = { image: communityImage };
    const ImgValue = this.userCommunity.some(
      (res) => res.image === this.userCommunityImage.image
    );
    console.log(ImgValue);
    if (!ImgValue) {
      this.userCommunity.push(this.userCommunityImage);
      this.messageService.add({
        severity: 'success',
        summary: 'Congratulations.',
        detail:'You have Join in this Community'
      });
    }
    if (ImgValue) {
      this.messageService.add({
        severity: 'warn',
        summary: 'You have already Join in this Community',
      });
    }
  }
}
