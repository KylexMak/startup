# startup

# Startup Proposal

## Elevator Pitch
Are you tired of losing cherished family recipes, passed down through generations, in a sea of handwritten notes and fading cookbooks? Look no further than FamilyTable, your digital kitchen companion designed to preserve, organize, and share your family's culinary heritage. This website can store all your family's treasured recipes in one secure and easily searchable digital library. You can upload recipes passed down from grandparents, aunts, and uncles, ensuring they're never lost again. Become part of a passionate community of food lovers dedicated to preserving family traditions. Share tips, swap stories, and celebrate the joy of home-cooked meals. Don't let your family's culinary legacy fade away. Start your journey with Family Secrets today and savor the flavors of nostalgia with every bite. Create, connect, and cherish your family's recipes like never before.

## Design
### Visual Design Sketch
![sketch of website](https://scontent-sjc3-1.xx.fbcdn.net/v/t1.15752-9/379658430_3608068092853298_500923761308092914_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=ae9488&_nc_ohc=SDYDITT-DT0AX8077_Y&_nc_ht=scontent-sjc3-1.xx&oh=03_AdQCGn2yv8eaMowwJTDA2zfMehWmQfLR1MEiRAgChNk7cw&oe=6535DED4)

### Interactive Backend
![flowchart](https://scontent-sjc3-1.xx.fbcdn.net/v/t1.15752-9/381352424_299251926168184_4236724852794659314_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=ae9488&_nc_ohc=n8Ol75iRs9sAX8YZ8qk&_nc_ht=scontent-sjc3-1.xx&oh=03_AdRYiKivjGBbGlVHTsXgwf0gOQMJwjKlp8NlbiD6xT7Mtw&oe=6536087D)

## Key Features
- Secure Login over HTTPS
- Ability to select individuals in the family
- Displays recipe options
- Ability to view recipe details
- Ability to create new recipes
- Stores recipe information in data base
- Stores User Data in data base
- Admin can delete or edit recipes

## Technologies
- HTML: Used for structuring the two pages, the front page with all recipies displayed and one to view the recipes. Hyper links to different recipes.
- CSS: Used for the styling of the page such as white space and colors.
- JavaScript: Provides login, choice display, displaying recipes, endpoint call backs.
- Service:Backend service with endpoints for login, retrieving choices, submitting recipes, retrieving recipes, etc.
- Data Base: Stores Users and recipes
- Login: Registers families. Credentials stored in data base. Can't see recipe without authentication.
- Websocket: Makes, deletes, or edits a recipe.
