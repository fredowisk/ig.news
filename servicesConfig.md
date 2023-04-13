## Stripe

Create a product called "Subscription" with the monthly billing amount of $9.90.

## FaunaDB

Create a database called Ignews.

### **Collections**

```json
[
  {
    "name": "subscriptions"
  },

  {
    "name": "users"
  }
]
```

### **Indexes**

```json
[
  {
    "name": "subscription_by_id",
    "unique": true,
    "serialized": true,
    "source": "subscriptions",
    "terms": "data.id"
  },

  {
    "name": "subscription_by_status",
    "unique": false,
    "serialized": true,
    "source": "subscriptions",
    "terms": "data.status"
  },

  {
    "name": "subscription_by_user_ref",
    "unique": false,
    "serialized": true,
    "source": "subscriptions",
    "terms": "data.userId"
  },

  {
    "name": "user_by_email",
    "unique": true,
    "serialized": true,
    "source": "users",
    "terms": "data.email"
  },

  {
    "name": "user_by_stripe_customer_id",
    "unique": false,
    "serialized": true,
    "source": "users",
    "terms": "data.stripe_customer_id"
  }
]
```

## Prismic CMS

Create a repository, go to "Custom Types" and then create a new one.

```json
[
  {
    "type": "Repeatable Type",
    "name": "publication",
    "fields": ["UID", "Title (h1)", "RichText (Allow multi paragraphs)"]
  }
]
```
After that, go to "Documents" tab and create some posts.