// 広告運用知識テスト問題データ
const testQuestions = [
    {
        id: 1,
        question: "Meta広告（Facebook/Instagram広告）で最も重要な指標はどれですか？",
        options: [
            "インプレッション数",
            "クリック数",
            "コンバージョン数",
            "リーチ数"
        ],
        correct: 2,
        explanation: "コンバージョン数は、広告の最終的な成果を表す最も重要な指標です。"
    },
    {
        id: 2,
        question: "CPA（Cost Per Acquisition）の正しい計算式はどれですか？",
        options: [
            "広告費 ÷ コンバージョン数",
            "コンバージョン数 ÷ 広告費",
            "クリック数 ÷ 広告費",
            "インプレッション数 ÷ 広告費"
        ],
        correct: 0,
        explanation: "CPA = 広告費 ÷ コンバージョン数 で計算されます。"
    },
    {
        id: 3,
        question: "ROAS（Return On Ad Spend）の正しい計算式はどれですか？",
        options: [
            "売上 ÷ 広告費",
            "広告費 ÷ 売上",
            "利益 ÷ 広告費",
            "広告費 ÷ 利益"
        ],
        correct: 0,
        explanation: "ROAS = 売上 ÷ 広告費 で計算されます。"
    },
    {
        id: 4,
        question: "CTR（Click Through Rate）の正しい計算式はどれですか？",
        options: [
            "クリック数 ÷ インプレッション数 × 100",
            "インプレッション数 ÷ クリック数 × 100",
            "コンバージョン数 ÷ クリック数 × 100",
            "クリック数 ÷ コンバージョン数 × 100"
        ],
        correct: 0,
        explanation: "CTR = クリック数 ÷ インプレッション数 × 100 で計算されます。"
    },
    {
        id: 5,
        question: "CVR（Conversion Rate）の正しい計算式はどれですか？",
        options: [
            "コンバージョン数 ÷ クリック数 × 100",
            "クリック数 ÷ コンバージョン数 × 100",
            "コンバージョン数 ÷ インプレッション数 × 100",
            "インプレッション数 ÷ コンバージョン数 × 100"
        ],
        correct: 0,
        explanation: "CVR = コンバージョン数 ÷ クリック数 × 100 で計算されます。"
    },
    {
        id: 6,
        question: "Meta広告の階層構造で、上位から正しい順序はどれですか？",
        options: [
            "キャンペーン → 広告セット → 広告",
            "広告セット → キャンペーン → 広告",
            "広告 → 広告セット → キャンペーン",
            "キャンペーン → 広告 → 広告セット"
        ],
        correct: 0,
        explanation: "Meta広告の階層構造は「キャンペーン → 広告セット → 広告」の順序です。"
    },
    {
        id: 7,
        question: "オーディエンスの種類で、最も精度が高いのはどれですか？",
        options: [
            "コアオーディエンス",
            "カスタムオーディエンス",
            "類似オーディエンス",
            "保存されたオーディエンス"
        ],
        correct: 1,
        explanation: "カスタムオーディエンスは、既存の顧客データを基に作成されるため最も精度が高いです。"
    },
    {
        id: 8,
        question: "Facebookピクセルの主な機能はどれですか？",
        options: [
            "広告の表示",
            "ウェブサイトの訪問者の行動追跡",
            "競合分析",
            "クリエイティブの作成"
        ],
        correct: 1,
        explanation: "Facebookピクセルは、ウェブサイトの訪問者の行動を追跡し、コンバージョンを測定するためのツールです。"
    },
    {
        id: 9,
        question: "広告のフリークエンシーが高すぎる場合の影響はどれですか？",
        options: [
            "CTRが向上する",
            "広告疲弊が起こる",
            "CPAが下がる",
            "リーチが増加する"
        ],
        correct: 1,
        explanation: "フリークエンシーが高すぎると、同じユーザーに同じ広告が何度も表示され、広告疲弊が起こります。"
    },
    {
        id: 10,
        question: "A/Bテストで統計的有意性を確認するために必要な要素はどれですか？",
        options: [
            "十分なサンプルサイズ",
            "適切なテスト期間",
            "ランダムな配信",
            "すべて"
        ],
        correct: 3,
        explanation: "統計的有意性を確認するには、十分なサンプルサイズ、適切なテスト期間、ランダムな配信がすべて必要です。"
    },
    {
        id: 11,
        question: "3C分析の「C」に含まれないのはどれですか？",
        options: [
            "Company（自社）",
            "Competitor（競合）",
            "Customer（顧客）",
            "Cost（コスト）"
        ],
        correct: 3,
        explanation: "3C分析はCompany（自社）、Competitor（競合）、Customer（顧客）の3つの観点から分析します。"
    },
    {
        id: 12,
        question: "CJM（Customer Journey Map）の主な目的はどれですか？",
        options: [
            "競合分析",
            "顧客の行動プロセスの可視化",
            "広告予算の決定",
            "クリエイティブの作成"
        ],
        correct: 1,
        explanation: "CJMは顧客の行動プロセスを可視化し、適切なタッチポイントを特定するためのツールです。"
    },
    {
        id: 13,
        question: "USP（Unique Selling Proposition）の正しい説明はどれですか？",
        options: [
            "競合との差別化ポイント",
            "商品の価格",
            "広告の予算",
            "ターゲットの年齢"
        ],
        correct: 0,
        explanation: "USPは競合との差別化ポイントを明確にした独自の価値提案です。"
    },
    {
        id: 14,
        question: "広告ポリシー違反の主なリスクはどれですか？",
        options: [
            "広告費の増加",
            "アカウント停止",
            "CTRの低下",
            "競合の増加"
        ],
        correct: 1,
        explanation: "広告ポリシー違反の主なリスクはアカウント停止です。"
    },
    {
        id: 15,
        question: "健康食品の広告で注意すべき表現はどれですか？",
        options: [
            "「おいしい」",
            "「便利」",
            "「治る」",
            "「人気」"
        ],
        correct: 2,
        explanation: "健康食品の広告では、医薬品的な効果をうたう「治る」などの表現は使用できません。"
    },
    {
        id: 16,
        question: "コンバージョンAPI（CAPI）の主な利点はどれですか？",
        options: [
            "広告の表示",
            "データの精度向上",
            "競合分析",
            "クリエイティブの作成"
        ],
        correct: 1,
        explanation: "CAPIはサーバーサイドからデータを送信することで、データの精度を向上させます。"
    },
    {
        id: 17,
        question: "UTMパラメータの主な目的はどれですか？",
        options: [
            "広告の表示",
            "トラフィックの出典追跡",
            "競合分析",
            "クリエイティブの作成"
        ],
        correct: 1,
        explanation: "UTMパラメータは、ウェブサイトへのトラフィックの出典を追跡するためのパラメータです。"
    },
    {
        id: 18,
        question: "Advantage+ ショッピングキャンペーン（ASC）の主な特徴はどれですか？",
        options: [
            "手動設定",
            "AIによる自動最適化",
            "競合分析",
            "クリエイティブの作成"
        ],
        correct: 1,
        explanation: "ASCはAIによる自動最適化が主な特徴で、Metaの機械学習を活用します。"
    },
    {
        id: 19,
        question: "広告の品質スコアに影響する要因はどれですか？",
        options: [
            "CTR",
            "広告の関連性",
            "ランディングページの品質",
            "すべて"
        ],
        correct: 3,
        explanation: "広告の品質スコアは、CTR、広告の関連性、ランディングページの品質など複数の要因に影響されます。"
    },
    {
        id: 20,
        question: "リターゲティングの主な目的はどれですか？",
        options: [
            "新規顧客の獲得",
            "既存顧客の再訪問促進",
            "競合分析",
            "クリエイティブの作成"
        ],
        correct: 1,
        explanation: "リターゲティングは、一度サイトを訪問したユーザーに再度アプローチし、再訪問を促進する手法です。"
    },
    {
        id: 21,
        question: "広告の入札戦略で「目標CPA」を設定する場合の利点はどれですか？",
        options: [
            "インプレッション数の最大化",
            "CPAの安定化",
            "競合分析",
            "クリエイティブの作成"
        ],
        correct: 1,
        explanation: "目標CPA設定により、設定したCPAを維持しながら最適化が行われます。"
    },
    {
        id: 22,
        question: "広告の入札戦略で「目標ROAS」を設定する場合の利点はどれですか？",
        options: [
            "CTRの最大化",
            "ROASの安定化",
            "競合分析",
            "クリエイティブの作成"
        ],
        correct: 1,
        explanation: "目標ROAS設定により、設定したROASを維持しながら最適化が行われます。"
    },
    {
        id: 23,
        question: "広告の予算配分で考慮すべき要素はどれですか？",
        options: [
            "キャンペーンの成果",
            "季節性",
            "競合の動向",
            "すべて"
        ],
        correct: 3,
        explanation: "予算配分では、キャンペーンの成果、季節性、競合の動向など複数の要素を考慮する必要があります。"
    },
    {
        id: 24,
        question: "広告のテストで「統計的有意性」を確認するために必要な期間はどれですか？",
        options: [
            "1日",
            "3日",
            "7日以上",
            "30日以上"
        ],
        correct: 2,
        explanation: "統計的有意性を確認するには、通常7日以上のテスト期間が必要です。"
    },
    {
        id: 25,
        question: "広告のクリエイティブで「13文字ルール」とは何ですか？",
        options: [
            "タイトルの文字数制限",
            "説明文の文字数制限",
            "CTAの文字数制限",
            "ヘッドラインの文字数制限"
        ],
        correct: 3,
        explanation: "13文字ルールは、ヘッドラインが13文字以内の場合、モバイルで1行に収まるという経験則です。"
    },
    {
        id: 26,
        question: "広告のクリエイティブで「28文字ルール」とは何ですか？",
        options: [
            "タイトルの文字数制限",
            "説明文の文字数制限",
            "CTAの文字数制限",
            "ヘッドラインの文字数制限"
        ],
        correct: 1,
        explanation: "28文字ルールは、説明文が28文字以内の場合、モバイルで1行に収まるという経験則です。"
    },
    {
        id: 27,
        question: "広告のクリエイティブで「3秒ルール」とは何ですか？",
        options: [
            "広告の表示時間",
            "ユーザーの注意を引く時間",
            "クリックまでの時間",
            "コンバージョンまでの時間"
        ],
        correct: 1,
        explanation: "3秒ルールは、ユーザーが広告に注意を向ける時間が3秒程度という経験則です。"
    },
    {
        id: 28,
        question: "広告の記事LPで重要な要素はどれですか？",
        options: [
            "情報価値の提供",
            "信頼関係の構築",
            "導線の設計",
            "すべて"
        ],
        correct: 3,
        explanation: "記事LPでは、情報価値の提供、信頼関係の構築、導線の設計がすべて重要です。"
    },
    {
        id: 29,
        question: "広告の記事LPで「情報を売る」という意識とは何ですか？",
        options: [
            "商品の情報を提供する",
            "商品の価値を伝える",
            "商品の購入を促す",
            "すべて"
        ],
        correct: 3,
        explanation: "「情報を売る」とは、商品の情報提供、価値伝達、購入促進を統合した考え方です。"
    },
    {
        id: 30,
        question: "広告の記事LPで「顧客を置いてきぼりにしない」構成とは何ですか？",
        options: [
            "情報の段階的提供",
            "導線の明確化",
            "理解度の確認",
            "すべて"
        ],
        correct: 3,
        explanation: "顧客を置いてきぼりにしない構成では、情報の段階的提供、導線の明確化、理解度の確認が重要です。"
    },
    {
        id: 31,
        question: "広告のPDCAサイクルで「Plan」の段階で行うことはどれですか？",
        options: [
            "目標設定",
            "戦略立案",
            "実行計画",
            "すべて"
        ],
        correct: 3,
        explanation: "Plan段階では、目標設定、戦略立案、実行計画をすべて行います。"
    },
    {
        id: 32,
        question: "広告のPDCAサイクルで「Do」の段階で行うことはどれですか？",
        options: [
            "広告の実行",
            "データの収集",
            "結果の記録",
            "すべて"
        ],
        correct: 3,
        explanation: "Do段階では、広告の実行、データの収集、結果の記録をすべて行います。"
    },
    {
        id: 33,
        question: "広告のPDCAサイクルで「Check」の段階で行うことはどれですか？",
        options: [
            "結果の分析",
            "目標との比較",
            "要因の特定",
            "すべて"
        ],
        correct: 3,
        explanation: "Check段階では、結果の分析、目標との比較、要因の特定をすべて行います。"
    },
    {
        id: 34,
        question: "広告のPDCAサイクルで「Action」の段階で行うことはどれですか？",
        options: [
            "改善策の実行",
            "次期計画の立案",
            "学習の蓄積",
            "すべて"
        ],
        correct: 3,
        explanation: "Action段階では、改善策の実行、次期計画の立案、学習の蓄積をすべて行います。"
    },
    {
        id: 35,
        question: "広告のテストで「勝ちパターン」の横展開とは何ですか？",
        options: [
            "成功要因の特定",
            "他商品への応用",
            "他キャンペーンへの応用",
            "すべて"
        ],
        correct: 3,
        explanation: "勝ちパターンの横展開では、成功要因の特定、他商品への応用、他キャンペーンへの応用をすべて行います。"
    },
    {
        id: 36,
        question: "広告のテストで「負けパターン」からの学びとは何ですか？",
        options: [
            "失敗要因の分析",
            "改善ポイントの特定",
            "次回への活かし方",
            "すべて"
        ],
        correct: 3,
        explanation: "負けパターンからの学びでは、失敗要因の分析、改善ポイントの特定、次回への活かし方をすべて行います。"
    },
    {
        id: 37,
        question: "広告のスワイプファイルの主な目的はどれですか？",
        options: [
            "競合分析",
            "成功事例の収集",
            "クリエイティブの参考",
            "すべて"
        ],
        correct: 3,
        explanation: "スワイプファイルは、競合分析、成功事例の収集、クリエイティブの参考を目的とします。"
    },
    {
        id: 38,
        question: "広告のスケール（予算増額）の判断基準はどれですか？",
        options: [
            "ROASの維持",
            "CPAの安定",
            "フリークエンシーの管理",
            "すべて"
        ],
        correct: 3,
        explanation: "スケールの判断では、ROASの維持、CPAの安定、フリークエンシーの管理をすべて考慮します。"
    },
    {
        id: 39,
        question: "広告のフリークエンシーが悪化した場合の対処法はどれですか？",
        options: [
            "クリエイティブの更新",
            "オーディエンスの拡大",
            "予算の調整",
            "すべて"
        ],
        correct: 3,
        explanation: "フリークエンシーの悪化には、クリエイティブの更新、オーディエンスの拡大、予算の調整をすべて行います。"
    },
    {
        id: 40,
        question: "広告のクリエイティブ疲弊の主な原因はどれですか？",
        options: [
            "同じ広告の繰り返し表示",
            "フリークエンシーの上昇",
            "オーディエンスの固定化",
            "すべて"
        ],
        correct: 3,
        explanation: "クリエイティブ疲弊は、同じ広告の繰り返し表示、フリークエンシーの上昇、オーディエンスの固定化が原因です。"
    },
    {
        id: 41,
        question: "広告の競合分析で重要な要素はどれですか？",
        options: [
            "訴求ポイント",
            "価格戦略",
            "クリエイティブ",
            "すべて"
        ],
        correct: 3,
        explanation: "競合分析では、訴求ポイント、価格戦略、クリエイティブをすべて分析する必要があります。"
    },
    {
        id: 42,
        question: "広告の成功事例を「パクって進化させる」とは何ですか？",
        options: [
            "そのままコピーする",
            "成功要因を分析して応用する",
            "競合を真似する",
            "すべて"
        ],
        correct: 1,
        explanation: "「パクって進化させる」とは、成功要因を分析して自社に応用することです。"
    },
    {
        id: 43,
        question: "広告の改善サイクルで「TTPS」とは何ですか？",
        options: [
            "Tactics, Techniques, Procedures, Systems",
            "Test, Track, Plan, Scale",
            "Target, Test, Plan, Scale",
            "Test, Track, Plan, Scale"
        ],
        correct: 3,
        explanation: "TTPSは「Test, Track, Plan, Scale」の略で、テスト、追跡、計画、スケールの改善サイクルです。"
    },
    {
        id: 44,
        question: "広告の改善サイクルで「Test」の段階で行うことはどれですか？",
        options: [
            "仮説の設定",
            "テストの実行",
            "結果の測定",
            "すべて"
        ],
        correct: 3,
        explanation: "Test段階では、仮説の設定、テストの実行、結果の測定をすべて行います。"
    },
    {
        id: 45,
        question: "広告の改善サイクルで「Track」の段階で行うことはどれですか？",
        options: [
            "データの収集",
            "指標の監視",
            "変化の追跡",
            "すべて"
        ],
        correct: 3,
        explanation: "Track段階では、データの収集、指標の監視、変化の追跡をすべて行います。"
    },
    {
        id: 46,
        question: "広告の改善サイクルで「Plan」の段階で行うことはどれですか？",
        options: [
            "結果の分析",
            "改善策の立案",
            "次期計画の策定",
            "すべて"
        ],
        correct: 3,
        explanation: "Plan段階では、結果の分析、改善策の立案、次期計画の策定をすべて行います。"
    },
    {
        id: 47,
        question: "広告の改善サイクルで「Scale」の段階で行うことはどれですか？",
        options: [
            "成功パターンの拡大",
            "予算の増額",
            "オーディエンスの拡大",
            "すべて"
        ],
        correct: 3,
        explanation: "Scale段階では、成功パターンの拡大、予算の増額、オーディエンスの拡大をすべて行います。"
    },
    {
        id: 48,
        question: "広告の外部パートナーとの連携で重要な要素はどれですか？",
        options: [
            "明確な役割分担",
            "定期的なコミュニケーション",
            "成果の共有",
            "すべて"
        ],
        correct: 3,
        explanation: "外部パートナーとの連携では、明確な役割分担、定期的なコミュニケーション、成果の共有が重要です。"
    },
    {
        id: 49,
        question: "広告の再現性の高いテストとは何ですか？",
        options: [
            "同じ条件で再現できるテスト",
            "結果が安定しているテスト",
            "学習が蓄積されるテスト",
            "すべて"
        ],
        correct: 3,
        explanation: "再現性の高いテストとは、同じ条件で再現でき、結果が安定し、学習が蓄積されるテストです。"
    },
    {
        id: 50,
        question: "広告運用で「PDCA状態」になるとは何ですか？",
        options: [
            "PDCAサイクルが回っている状態",
            "継続的な改善が行われている状態",
            "学習が蓄積されている状態",
            "すべて"
        ],
        correct: 3,
        explanation: "「PDCA状態」とは、PDCAサイクルが回り、継続的な改善が行われ、学習が蓄積されている状態です。"
    }
];

// テスト結果の保存と管理
class TestResultManager {
    constructor() {
        this.results = JSON.parse(localStorage.getItem('testResults') || '[]');
    }

    saveResult(name, score, totalQuestions, wrongAnswers, timeSpent) {
        const result = {
            id: Date.now(),
            name: name,
            score: score,
            totalQuestions: totalQuestions,
            percentage: Math.round((score / totalQuestions) * 100),
            wrongAnswers: wrongAnswers,
            timeSpent: timeSpent,
            date: new Date().toISOString()
        };
        
        this.results.push(result);
        localStorage.setItem('testResults', JSON.stringify(this.results));
        return result;
    }

    getResults() {
        return this.results;
    }

    getResultById(id) {
        return this.results.find(result => result.id === id);
    }

    deleteResult(id) {
        this.results = this.results.filter(result => result.id !== id);
        localStorage.setItem('testResults', JSON.stringify(this.results));
    }
}
