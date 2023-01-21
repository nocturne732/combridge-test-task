/**
 * @param number The id of the episode
 * @param name The name of the episode.
 * @param air_date The air date of the episode.
 * @param episode The code of the episode.
 * @param characters List of characters who have been seen in the episode.
 * @param url (url)	Link to the episode's own endpoint.
 * @param created Time at which the episode was created in the database.
 */

export interface Episode {
  id:	number,
  name:	string,
  air_date:	string,
  episode:	string,
  characters: string[],
  url: string,
  created: string
}
