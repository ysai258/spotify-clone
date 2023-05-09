import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  JSON: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
};

export type Playlist = {
  __typename?: 'Playlist';
  id: Scalars['Int'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  getCategories?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  getPlaylists: Array<Playlist>;
  getSongs: Array<Song>;
  getStories: Array<Maybe<Story>>;
  getStory: Story;
};


export type QueryGetCategoriesArgs = {
  type?: InputMaybe<Scalars['String']>;
};


export type QueryGetSongsArgs = {
  playlistId: Scalars['Int'];
  search?: InputMaybe<Scalars['String']>;
};


export type QueryGetStoriesArgs = {
  find?: InputMaybe<SearchInput>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<QueryInput>;
};


export type QueryGetStoryArgs = {
  id: Scalars['Int'];
};

export type QueryInput = {
  order?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
};

export type SearchInput = {
  category?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  tag?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type Song = {
  __typename?: 'Song';
  _id: Scalars['ID'];
  artist: Scalars['String'];
  duration: Scalars['Int'];
  photo: Scalars['String'];
  title: Scalars['String'];
  url: Scalars['String'];
};

export type Story = {
  __typename?: 'Story';
  author?: Maybe<Scalars['JSON']>;
  categories?: Maybe<Scalars['JSON']>;
  content?: Maybe<Scalars['String']>;
  custom_fields?: Maybe<Scalars['JSON']>;
  destinations?: Maybe<Scalars['JSON']>;
  due_at?: Maybe<Scalars['Date']>;
  excerpt?: Maybe<Scalars['String']>;
  featured_image?: Maybe<Scalars['JSON']>;
  id?: Maybe<Scalars['Int']>;
  language?: Maybe<Scalars['String']>;
  primaryCategory?: Maybe<Scalars['JSON']>;
  published_at?: Maybe<Scalars['Date']>;
  seo_description?: Maybe<Scalars['String']>;
  seo_title?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['JSON']>;
  tags?: Maybe<Scalars['JSON']>;
  title?: Maybe<Scalars['String']>;
  translations?: Maybe<Scalars['JSON']>;
  updated_at?: Maybe<Scalars['Date']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  _empty?: Maybe<Scalars['String']>;
};

export type GetPlaylistsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPlaylistsQuery = { __typename?: 'Query', getPlaylists: Array<{ __typename?: 'Playlist', id: number, title: string }> };

export type GetSongsQueryVariables = Exact<{
  playlistId: Scalars['Int'];
  search?: InputMaybe<Scalars['String']>;
}>;


export type GetSongsQuery = { __typename?: 'Query', getSongs: Array<{ __typename?: 'Song', _id: string, artist: string, duration: number, photo: string, title: string, url: string }> };


export const GetPlaylistsDocument = gql`
    query GetPlaylists {
  getPlaylists {
    id
    title
  }
}
    `;

/**
 * __useGetPlaylistsQuery__
 *
 * To run a query within a React component, call `useGetPlaylistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlaylistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlaylistsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPlaylistsQuery(baseOptions?: Apollo.QueryHookOptions<GetPlaylistsQuery, GetPlaylistsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlaylistsQuery, GetPlaylistsQueryVariables>(GetPlaylistsDocument, options);
      }
export function useGetPlaylistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlaylistsQuery, GetPlaylistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlaylistsQuery, GetPlaylistsQueryVariables>(GetPlaylistsDocument, options);
        }
export type GetPlaylistsQueryHookResult = ReturnType<typeof useGetPlaylistsQuery>;
export type GetPlaylistsLazyQueryHookResult = ReturnType<typeof useGetPlaylistsLazyQuery>;
export type GetPlaylistsQueryResult = Apollo.QueryResult<GetPlaylistsQuery, GetPlaylistsQueryVariables>;
export const GetSongsDocument = gql`
    query GetSongs($playlistId: Int!, $search: String) {
  getSongs(playlistId: $playlistId, search: $search) {
    _id
    artist
    duration
    photo
    title
    url
  }
}
    `;

/**
 * __useGetSongsQuery__
 *
 * To run a query within a React component, call `useGetSongsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSongsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSongsQuery({
 *   variables: {
 *      playlistId: // value for 'playlistId'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useGetSongsQuery(baseOptions: Apollo.QueryHookOptions<GetSongsQuery, GetSongsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSongsQuery, GetSongsQueryVariables>(GetSongsDocument, options);
      }
export function useGetSongsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSongsQuery, GetSongsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSongsQuery, GetSongsQueryVariables>(GetSongsDocument, options);
        }
export type GetSongsQueryHookResult = ReturnType<typeof useGetSongsQuery>;
export type GetSongsLazyQueryHookResult = ReturnType<typeof useGetSongsLazyQuery>;
export type GetSongsQueryResult = Apollo.QueryResult<GetSongsQuery, GetSongsQueryVariables>;