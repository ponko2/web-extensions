{
  description = "Web Extensions";

  inputs = {
    flake-parts.url = "github:hercules-ci/flake-parts";
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  };

  outputs =
    inputs@{ flake-parts, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = [
        "aarch64-darwin"
        "aarch64-linux"
        "x86_64-darwin"
        "x86_64-linux"
      ];
      perSystem =
        { pkgs, ... }:
        let
          pnpm = pkgs.runCommand "pnpm" { buildInputs = [ pkgs.nodejs_24 ]; } ''
            mkdir -p $out/bin
            corepack enable pnpm --install-directory=$out/bin
          '';
        in
        {
          devShells.default = pkgs.mkShellNoCC {
            packages = with pkgs; [
              editorconfig-checker
              nixfmt-rfc-style
              pnpm
              yamllint
            ];
            shellHook = ''
              pnpm install
              export PATH="$HOME/.vite-plus/bin:$PWD/node_modules/.bin:$PATH"
            '';
          };
          formatter = pkgs.nixfmt-tree;
          packages = {
            inherit (pkgs)
              direnv
              nix-direnv
              ;
          };
        };
    };
}
