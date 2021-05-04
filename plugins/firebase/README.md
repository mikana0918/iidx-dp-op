# About directory

This directory is made for firebase plug-in(s).

Although it's often the case to register plugins and inject from vue instance, currently(@4, May, 2021) just we use it by importing each modules.

# このディレクトリについて

Firebase 関連(firebase/{サービス})のプラグインを置いている。

現状(2021/5/4)においては、firebase を常に Plugin として読み込むのもデータストアの変更に弱くなる設計になるかと思い、プレーンなスクリプトを読み込んで使う設計にしている。

コンポーネントから$firebase のようにグローバルに使って欲しくない。（firebase が例えば RDB との並行運用になる可能性もあると思っている）

将来的にはポート別 Repository を立てて、その中でデータソース問わず取得オブジェクトを抽象化しているのがベストか。
