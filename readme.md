Auto BEM Modules and Bem Decorators
----

Refer also to [Auto-Bem](https://travis-ci.org/tenbits/autoBem)

[![Build Status](https://travis-ci.org/tenbits/autoBem-mask.png?branch=master)](https://travis-ci.org/tenbits/autoBem-mask)

## Mask


```mask
import 'Foo.less' as bem;

define MyFoo { 
    [bem]
    section .active {
        header > 'Hello'
        button .fab > 'Do smth'
    }
}
```

```less
section {
    background: red;
    header {
        font-weight: bold;        
    }
    .fab {
        border-radius: 50%;
    }
}
section.active {
    header {
        color: black;
    }
    .fab {
        text-transform: uppercase;
    }
}
```



---

> :heart: We love any kind of questions and suggestions.

:copyright: 2017 - MIT
