import { Connection, PublicKey, Transaction, clusterApiUrl } from "@solana/web3.js"
import { createMemoInstruction } from "@solana/spl-memo"

const connection = new Connection(clusterApiUrl("devnet"), "confirmed")

export async function writeProofToSolana(proof: any, walletProvider: any) {
  const publicKey = walletProvider.publicKey

  const memoData = JSON.stringify({
    protocol: "GTP",
    version: "0.1",
    proofId: proof.proofId,
    gameId: proof.sourceGame.gameId,
    achievementId: proof.achievement.achievementId,
    wallet: proof.playerWallet,
    issuedAt: proof.issuedAt,
  })

  const tx = new Transaction().add(createMemoInstruction(memoData))
  tx.feePayer = publicKey
  tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

  const signedTx = await walletProvider.signTransaction(tx)
  const signature = await connection.sendRawTransaction(signedTx.serialize())
  await connection.confirmTransaction(signature, "confirmed")

  return {
    signature,
    explorerUrl: `https://explorer.solana.com/tx/${signature}?cluster=devnet`,
  }
}
