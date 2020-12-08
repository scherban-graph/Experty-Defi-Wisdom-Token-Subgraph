import { BigInt } from "@graphprotocol/graph-ts"
import {
  WisdomToken,
  Approval,
  Pause,
  Transfer,
  TransferOwnership,
  Unpause
} from "../generated/WisdomToken/WisdomToken"
import { _Approval, _Transfer, _TransferOwnership } from "../generated/schema"

export function handleApproval(event: Approval): void {
  let entity = _Approval.load(event.params.value.toHex())

  if (entity == null) {
    entity = new _Approval(event.params.value.toHex())
    entity.count = BigInt.fromI32(0)
  }

  entity.count = entity.count + BigInt.fromI32(1)
  entity.holder = event.params.holder
  entity.spender = event.params.spender
  entity.value = event.params.value
  entity.save()
}

export function handlePause(event: Pause): void {}

export function handleTransfer(event: Transfer): void {
  let entity = _Transfer.load(event.params.value.toHex())

  if (entity == null) {
    entity = new _Transfer(event.params.value.toHex())
    entity.count = BigInt.fromI32(0)
  }

  entity.count = entity.count + BigInt.fromI32(1)
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value
  entity.save()
}

export function handleTransferOwnership(event: TransferOwnership): void {
  let entity = _TransferOwnership.load(event.params.newOwner.toHex())

  if (entity == null) {
    entity = new _TransferOwnership(event.params.newOwner.toHex())
    entity.count = BigInt.fromI32(0)
  }

  entity.count = entity.count + BigInt.fromI32(1)
  entity.newOwner = event.params.newOwner
  entity.save()
}

export function handleUnpause(event: Unpause): void {}
