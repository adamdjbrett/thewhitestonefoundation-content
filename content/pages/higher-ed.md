---
title: "Higher Ed"
permalink: /higher-ed/
templateEngineOverride: njk
---

{% if collections.higherEd | length %}

  {% for post in collections.higherEd %}
  

- [{{ post.data.title }}]({{ post.url }})

  {% endfor %}

{% else %}

No posts found yet.

{% endif %}
