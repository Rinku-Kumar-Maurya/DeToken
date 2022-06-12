import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor Token {
  let owner : Principal = Principal.fromText("ci5hl-rwmzm-bn6nl-agt4p-yfgsv-6zero-rzoyq-tsy3t-23lfa-l7jsg-oqe");
  let totalSupply : Nat = 1000000000;
  let symbol : Text = "NOVA";

  private stable var balanceEntries : [(Principal, Nat)] = [];

  private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
  if(balances.size() < 1){
    balances.put(owner, totalSupply);
  };

  public query func getSymbol(): async Text {
    return symbol;
  };

  public query func balanceOf(who: Principal) : async Nat {
    let balance : Nat = switch (balances.get(who)) {
      case null 0;
      case (?res) res;
    };

    return balance;
  };

  public shared(msg) func payOut(): async Text {
    Debug.print(debug_show(msg.caller));
    if(balances.get(msg.caller) == null){
      let amount = 10000;
      let res = await transfer(msg.caller, amount);
      return res;
    } else{
      return "Already Claimed";
    }
  };

  public shared(msg) func transfer(to: Principal, amount: Nat): async Text {
    let fromBalance = await balanceOf(msg.caller);
    if(fromBalance >= amount) {
      let newFromBalance = fromBalance - amount;
      balances.put(msg.caller, newFromBalance);

      let toBalance = await balanceOf(to);
      balances.put(to, toBalance + amount);

      return "Success";
    } else{
      return "Insufficient Balance"
    }
  };

  system func preupgrade() {
    balanceEntries := Iter.toArray(balances.entries());
  };

  system func postupgrade() {
    balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);

    if(balances.size() < 1){
      balances.put(owner, totalSupply);
    }
  };

}