---
title: "News"
permalink: /news/
templateEngineOverride: njk
---

{% if collections.posts | length %}

  {% for post in collections.posts | reverse %}
  

- 

## [{{ post.data.title }}]({{ post.url }})

      {% if post.date %}{{ post.date | readableDate }}{% endif %}
      {% if post.data.author %} | {{ post.data.author }}{% endif %}
    

    {% if post.data.description %}
    

*{{ post.data.description }}…*

    {% endif %}
  

  {% endfor %}

{% else %}

No posts found yet.

{% endif %}
