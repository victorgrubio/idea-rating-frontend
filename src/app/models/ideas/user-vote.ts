export class UserVote {
  username: string
  sentenceVoteIdList: number[]

  constructor(
    username: string = "",
    sentenceVoteList: number[] = []
  ) {
    this.username = username;
    this.sentenceVoteIdList = sentenceVoteList
  }
}
